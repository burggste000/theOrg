import"./chart.css";
import React from "react";

const countEmployee = (employee) => {
    let total = 1;
    for(let e of employee.directs)
        total += countEmployee(e);
    return total;
}

const countEmployees=(employees) => {
    let total = 0;
    for(let e of employees) {
        if (!e.manager) {
            total += countEmployee(e);
        }
    }
    return total;
}

const updateMans=empAr=>{
    console.log("empAr.length: ", empAr.length);
    let count = 0;
    let managerCount = 0;
    let noManagerCount = 0;
    for(let element of empAr){
        const managerr=empAr.find(e=>e.id===element.managerId);
        if(managerr){
            ++managerCount;
            element.manager=managerr;
            if (!('directs' in managerr))
                managerr.directs = [];
            managerr.directs.push(element);
        }
        else{
            ++noManagerCount;
            element.manager=null;
        }
        if (!('directs' in element))
            element.directs = [];
        ++count;
    }
    console.log("Count: ", count);
    console.log("Manager Count: ", managerCount);
    console.log("No manager count: ", noManagerCount);
    console.log("Employee Count: ", countEmployees(empAr));
}    

const renderEmployeeJSX=(employee, indentCount) => {
    return <tr key={employee.id}><td>{'\u00a0'.repeat(indentCount * 4) + employee.name}</td><td>{employee.title}</td><td>{employee.manager?employee.manager.name:''}</td></tr>;
}

const renderEmployee=(employee, indentCount, components) => {
    console.log('.'.repeat(indentCount * 4), employee.name);
    components.push(renderEmployeeJSX(employee, indentCount));
    for(let e of employee.directs) {
        renderEmployee(e, indentCount + 1, components);
    }
    return components;
};

const renderOrg=(employees) => {
    const components = [];
    for(let e of employees) {
        if (!e.manager)
            renderEmployee(e, 0, components);
    }
    return components;
};

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
                <thead><tr><th>Name</th><th>Title</th><th>Manager</th></tr></thead>
                <tbody>
                    {renderOrg(employees)}
                </tbody>
            </table>
        </main>
    );
}
export{Chart};