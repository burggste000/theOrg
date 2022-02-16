import"./chart.css";
import React from "react";

const Chart=()=>{
    const[employees,setEmployees]=React.useState([]);
    React.useEffect(()=>{
        fetch("/employees")
        .then(res=>res.json())
        .then(json=>setEmployees(json));
    });
    return(
        <main>
            <table id="dvCSV">
                <th>Name</th><th>Title</th><th>Manager</th>
                    {
                        employees.map(e=><tr><td>{e.name}</td><td>{e.title}</td><td>{e.manager}</td></tr>)    
                    }
            </table>
        </main>
    );
}
export{Chart};