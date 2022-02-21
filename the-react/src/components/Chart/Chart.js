import"./chart.css";
import React from "react";  

const renderEmployeeJSX=(employee,indentCount,onEmployeeClick) => {
    return <tr key={employee.id}><td onClick={()=>onEmployeeClick(employee)}>{'\u00a0'.repeat(indentCount * 4) + employee.name}</td><td>{employee.title}</td><td>{employee.manager?employee.manager.name:''}</td></tr>;
}

const renderEmployee=(employee, indentCount, components,onEmployeeClick) => {
    console.log('.'.repeat(indentCount * 4), employee.name);
    components.push(renderEmployeeJSX(employee,indentCount,onEmployeeClick));
    for(let e of employee.directs) {
        renderEmployee(e, indentCount + 1, components);
    }
    return components;
};

const renderOrg=(employees,onEmployeeClick) => {
    const components = [];
    for(let e of employees) {
        if (!e.manager)
            renderEmployee(e, 0, components,onEmployeeClick);
    }
    return components;
};

const Chart=(props)=>{
    return(
        <main>
            <table id="dvCSV">
                <thead><tr><th>Name</th><th>Title</th><th>Manager</th></tr></thead>
                <tbody>
                    {renderOrg(props.employees,props.onEmployeeClick)}
                </tbody>
            </table>
        </main>
    );
}
export{Chart};