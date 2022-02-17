import"./chart.css";
import React from "react";
import{updateMans}from"../sharedFunctions";

const Chart=()=>{
    const[employees,setEmployees]=React.useState([]);
    React.useEffect(()=>{
        fetch("/api/employees")
        .then(res=>res.json())
        .then(json=>{
            updateMans(json);
            setEmployees(json);
        });
    },[]);
    return(
        <main>
            <table id="dvCSV">
                <th>Name</th><th>Title</th><th>Manager</th>
                    {
                        employees.map(e=><tr><td>{e.name}</td><td>{e.title}</td><td>{e.manager?e.manager.name:''}</td></tr>)    
                    }
            </table>
        </main>
    );
}
export{Chart};