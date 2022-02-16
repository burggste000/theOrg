import"./chart.css";
import React from "react";

const Chart=()=>{
    const[employees,setEmployees]=React.useState([]);
    const updateMans=empAr=>{
        for(let element of empAr){
            const managerr=empAr.find(e=>e.id==element.managerId);
            if(managerr){
                element.manager=managerr;
                if (!managerr.directs) {
                    managerr.directs = [];
                }
                managerr.directs.push(element);
            }
            else{
                element.manager=null;
            }
            if (!element.directs) {
                element.directs = [];
            }
        }
    }    
    React.useEffect(()=>{
        fetch("/api/employees")
        .then(res=>res.json())
        .then(json=>{updateMans(json);
            setEmployees(json)
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