import"./add.css";
import React from"react";
const Add=(props)=>{
    const newId=()=>{
        let max=0;
        for(let element of props.employees){
            if(element.id>Number(max)){
                max=element.id;
            }
        }
        return Number(max)+1;
    }    

    const createEmp=()=>{
        if(!props.selectedEmp)
            return;
        const newEmp={
            id:newId(),
            name:props.selectedEmp.name,
            managerId:props.selectedEmp.managerId,
            title:props.selectedEmp.title
        };
        fetch("api/create",{
            method:'post',
            body:JSON.stringify(newEmp)
        })
        .then(res=>res.json())
        .then(json=>{
        props.setEmployees(json);
        }).catch(err => console.log(err));
    }
    
    return(
        <div className={props.addWasClicked?null:"form-popup"} id="myForm">
            <form action="/action_page.php" className="form-container">
                <h1>Add Employee</h1>
                <label htmlFor="text"><b>Name</b></label>
                <input id="name"type="text" placeholder="Enter Name"onChange={e=>props.setSelectedEmp({name:e.value})} required />
                <label htmlFor="text"><b>Job Title</b></label>
                <input id="title"type="text" placeholder="Enter Title"onChange={e=>props.setSelectedEmp({title:e.value})} required />
                <label htmlFor="text"><b>Manager</b></label>
                <input id="managerName"type="text" placeholder="Enter Manager"readonly />
                <label htmlFor="text"><b>Manager Identification Number</b></label>
                <input id="managerId"type="text" placeholder="Enter Manager Identification Number"readonly />
                <button type="button" className="btn" onClick={createEmp}>Create</button>
                <button type="button" className="btn cancel" onClick={props.closeAdd}>Cancel</button>
            </form>
        </div> 
    );
}
export{Add};