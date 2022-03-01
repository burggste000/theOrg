/*
api.js - A server module that implements an ExpressJS Router (controller) for all of the api endpoints used by index.js.

# REQUIRED ENVIRONMENT VARIABLES
CONNECTION_STRING = [URL found in Heroku PostgreSQL database settings]

# ENDPOINTS
GET: /api/employees - Returns all of the employees data.
POST: /api/employees - Creates the employees database table from the JSON data provided.
POST: /api/create - Adds the provided JSON employee to the employees database table.
POST: /api/delete - Deletes the specified (by id) employee from the database after moving directs up to deleted employees manager.
GET: /api/csv - Returns all data from the employees table in .csv format.
*/
const express = require('express'); // npm i express
const router = express.Router();

/*
Load custom environment variables

dotenv.config() loads all of the customized environment variables from the projects .env file.  It needs to be called before any environment variables are used.  The .env file is not in the git repo, as it contains environment variables that are unique to the user or server this app is running on.

Since dotenv is not needed except to call .config() we don't create a dotenv variable to hold the result of require('dotenv').
*/
require('dotenv').config(); // npm i dotenv.

/*
Connect to the PostgreSQL database on Heroku

Sequelize is an ORM (Object Relational Mapping) library.  It provides a standard interface to relational databases like PostgreSQL.

Before data in a database can be accessed, a network connection must be established to the database.  For this simple application a single database connection is created and left open for as long as the server is running.  In a high-scale application it would be best to use database connection pooling so that all data queries aren't serialized - meaning - only one query at a time can be processed by a connection, so if you have a 1000 requests for data, they happen one at a time.  If, instead, there were multiple connections to a database (called a pool), then multiple queries could be run at the same time.

The PostgreSQL connection string needs to be specified in the .env file.  When the database is hosted on Heroku, this string can be obtained by going to the database server administration page on Heroku and copying the connection URL.

Here are some useful commands for executing in SQLTabs:
DROP TABLE IF EXISTS Employees;
SELECT * FROM Employees;
*/
const Sequelize = require("sequelize"); // npm i sequelize pg pg-hstore
console.log("PG Connection String: ", process.env.CONNECTION_STRING);
const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

/* 
CamelCase column names need to be quoted in all SQL statements

Unlike other servers, PostgreSQL converts all names (table and columns) to lowercase.  If the names in the incoming JSON data are camel-case instead of snake-case, then PostgreSQL will convert them to all lowercase.  This can lead to problems when sequelize converts SQL query results back into JSON.  For that reason, if camel-case is desired, all table and field names need to be quoted when passed to PostgreSQL.

For or all of the SQL statements, managerId needs to be in quotes.  PostgreSQL defaults to all column names being lower case.  If the names aren't quoted, then the camel casing will be removed and additional work will be required to either convert them or change the code to use all lower case letters.  See: https://www.drupal.org/project/drupal/issues/1622982.
*/

/*
Function getEmployees(onGot, onError) retrieves all employee data from the database and calls onGot() with the results.  onError() will be called if the data can't be retrieved.

Since the majority of endpoints return the updated dataset after performing their action, this function gets that data from the database and then provides it back to the caller or reports an error.

In the future, this could be implemented with promises, thus enabling the .then().catch() pattern for callers of getEmployees(...).
*/
const getEmployees = (onGot, onError) => {
    //const sql = "SELECT id, name, manager_id, title FROM Employees;"
    const sql = "SELECT Employees.id, Employees.name, Employees.manager_id, Titles.title, Employees.pic_link from Employees INNER JOIN Titles ON Employees.title_id = Titles.id;"
    sequelize.query(sql)
    .then((results) => {
        console.log('api.js:getEmployees: ', results[0].length, ' employees returned from database: ', results[0]);
        onGot(results[0]);
    })
    .catch(err => {
        console.log('api.js:getEmployees: error getting employees from DB: ', err);
        onError(err);
    });
}

/*
Function respondWithEmployees(res) - Gets all of the employee data and then uses the specified response object to send that data back to the client.

Since most of the endpoints return all of the employee data back to the client, this functionn is used to get the data and send it back.

In the future, it might be nice to have an error custom error message that could be sent back to the client when there is an error.
*/
const respondWithEmployees = (res) => {
    getEmployees(
        employees => {
            res.status(200).send(employees);
        },
        err => {
            console.log("api.js:respondWithEmployees: Failed to get employees from DB: ", err);
            res.status(500).send([]);
        }
    );
}

/*
Function queryAndRespondWithEmployees(sql, res) - Executes the provided SQL string, and then responds back to the client with employee data.

Most of the endpoints simply execute a SQL query, and then return all of the employee data.
*/
const queryAndRespondWithEmployees = (sql, res) => {
    console.log("api.js: Executing SQL: ", sql);

    sequelize.query(sql)
        .then(() => {
            console.log('api.js: Executed SQL: ', sql)
            respondWithEmployees(res);
        })
        .catch(err => {
            console.log('api.js: Error: ', err, '. Executed SQL: ', sql);
            respondWithEmployees(res);
        });
    }

/*
Route GET:/api/employees - Returns all of the employee data from the Employee database formatted as JSON.
*/
router.get('/employees', function (req, res, next) {
    respondWithEmployees(res);
});

/*
Route POST:/api/employees - Replaces all of the employee data in the database with the provided JSON employee data.

Deletes and then recreates the Employees table.  After the table is created, all of the employees in the reqest body are inserted into the database.  The request body should contain all of the employees in JSON format.
*/
router.post('/employees', function (req, res, next) {
    let employees = req.body;

    let sql = "";
    // Since we are uploading the entire data set, we simply drop any existing table.
    sql += "DROP TABLE IF EXISTS Employees;";
    sql += "DROP TABLE IF EXISTS Titles;";

    // The id field is "SERIAL".  This is PostreSQL specific.  Other DBs have a mechanism for creating unique, auto-increment, primary keys.  If we wanted to use the Sequelize object model functions, this could be done in a database neurtral way, but for this project we are learning SQL, so, this will only work right with PostgreSQL.
    sql += "CREATE TABLE Titles (id SERIAL PRIMARY KEY, title TEXT NOT NULL UNIQUE);";
    sql += "CREATE TABLE Employees (id SERIAL PRIMARY KEY, name TEXT NOT NULL, manager_id INTEGER, title_id INTEGER NOT NULL REFERENCES Titles(id), pic_link TEXT NOT NULL);";

    // Insert all of the values found in the post-ed request into the DB.
    let count = 0;
    for (let e of employees) {
        sql += "INSERT INTO Titles (id, title) VALUES (DEFAULT, '" + e.title + "') ON CONFLICT DO NOTHING;"
        sql += "INSERT INTO Employees (id, name, manager_id, title_id, pic_link) VALUES (" + e.id + ",'" + e.name + "'," + (e.manager_id ? e.manager_id : "0") + ",(SELECT id FROM Titles WHERE title = '" + e.title + "'), '"+e.pic_link+"');";
        }

    // Since the data uploaded has it's own id's, if future sql inserts are going to work, PostgreSQL needs to be update so that the auto id generator knows what the last id was.  See: https://dba.stackexchange.com/questions/243434/in-case-of-inserted-a-fixed-value-into-autoincrement-how-to-automatically-skip-i
    sql += "SELECT setval(pg_get_serial_sequence('Titles', 'id'), (SELECT max(id) from Titles));"
    sql += "SELECT setval(pg_get_serial_sequence('employees', 'id'), (SELECT max(id) from Employees));"

    queryAndRespondWithEmployees(sql, res);
});

/*
Route POST:/api/create - Adds the employee represented in JSON in the request to the database.

The request body contains the JSON for the employee to be added to the database.  The id field of the employee object is ignored, as one will be automatically assigened by the database.

The updated employee data is returned in the response.
*/
router.post('/create', function (req, res, next) {
    const e = req.body;
    console.log("New Emp: ", e);
    // The insert statement does not include the id.  The database will auto-generate the id.  See the CREATE TABLE comments in router.post('/employees',...).
    // Update: Added id back into the insert statement and used DEFAULT as the value for id.  See: https://www.postgresqltutorial.com/postgresql-serial/.
    let sql = "INSERT INTO Titles (id, title) VALUES (DEFAULT, '" + e.title + "') ON CONFLICT DO NOTHING;"
    sql += "INSERT INTO Employees (name, manager_id, title_id, pic_link) VALUES ('" + e.name + "'," + (e.manager_id ? e.manager_id : "0") + ",(SELECT id FROM Titles WHERE title = '" + e.title + "'),'"+e.pic_link+"');";

    queryAndRespondWithEmployees(sql, res);
});

/*
Route POST:/api/delete - Deletes the employee associate with the id specified.

The body of the request contains a JSON object that has an id field holding the id of the employee to be deleted.  Before deleting the employee, if the employee has any direct reports, they are moved to report to the to-be-deleted employees' manager.  After they have been moved, the specified employee is deleted from the database.

The updated employee data is returned in the response.
*/
router.post('/delete',(req, res, next)=>{
    const id=req.body;
    let sql = "";
    sql += "UPDATE Employees SET manager_id = (SELECT manager_id From Employees WHERE id = " + id.id + ") WHERE manager_id = " + id.id + ";";
    sql += "DELETE FROM Employees WHERE id=" + id.id + ";";

    queryAndRespondWithEmployees(sql, res);
});

/*
Route POST:/api/csv - Return all of the employees in a .csv format.
*/
router.get('/csv', function (req, res, next) {
    getEmployees(
        employees => {
            // The first row is the header row.
            let csvString = "id,name,managerId,title,pic_link\r\n";

            // Next comes the employees...
            for (let e of employees)
                csvString += e.id + "," + e.name + "," + e.manager_id + "," + e.title + ","+e.pic_link+"\r\n";
            res.setHeader("content-type", "text/csv");
            res.status(200).send(csvString);
        },
        err => {
            console.log("api.js: Failed to get employees from DB: ", err);
            res.status(500).send([]);
        }
    );
});

module.exports = router;