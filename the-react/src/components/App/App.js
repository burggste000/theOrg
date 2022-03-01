import'./app.css';
import React from"react";
import{Header}from"../Header/Header.js";
import{Chart}from"../Chart/Chart.js";
import{Add}from"../Add/Add.js";
import{Delete}from"../Delete/Delete.js";
export default function App() {
    const[selectedEmp,setSelectedEmp]=React.useState(null);
    const[addWasClicked,setAddWasClicked]=React.useState(false);
    const[deleteWasClicked,setDeleteWasClicked]=React.useState(false);
    const[employees,setEmployees]=React.useState([]);
    
    const bringAdd=()=>{
        setDeleteWasClicked(false);
        setAddWasClicked(true);
    }
    const closeAdd=()=>{
        setAddWasClicked(false);
    }
    
    
    const bringDelete=()=>{
        setAddWasClicked(false);
        setDeleteWasClicked(true);
    }

    const closeDelete=()=>{
        setDeleteWasClicked(false);
    }

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
            const managerr=empAr.find(e=>e.id===element.manager_id);
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

    React.useEffect(()=>{
        fetch("/api/employees")
        .then(res=>res.json())
        .then(json=>{
            updateMans(json);
            setEmployees(json);
        });
    },[]);

    const deleteEmp=()=>{
        if(selectedEmp.directs)
            selectedEmp.directs=null;
            selectedEmp.manager=null;
            console.log(selectedEmp);
        if(!selectedEmp)
            return;
        fetch("api/delete",{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(selectedEmp)})
        .then(res=>res.json())
        .then(json=>{
            // console.log(json);
            setEmployees(json);
        })
        .catch(err=>console.log(err));
    }


    return(
        <>
            <Header bringAdd={bringAdd}bringDelete={bringDelete}setEmployees={(emps)=>{updateMans(emps);setEmployees(emps)}}setAddWasClicked={setAddWasClicked}setDeleteWasClicked={setDeleteWasClicked} />
            <Add addWasClicked={addWasClicked}closeAdd={closeAdd}employees={employees}setEmployees={(emps)=>{updateMans(emps);setEmployees(emps)}}selectedEmp={selectedEmp} />
            <Delete deleteWasClicked={deleteWasClicked}closeDelete={closeDelete}deleteEmp={deleteEmp}selectedEmp={selectedEmp} />
            <div id="chartDiv">
                <Chart id="chartId"employees={employees}onEmployeeClick={employee=>setSelectedEmp(employee)} />
            </div>
        </>
    );
}