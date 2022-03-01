import"./add.css";
import React from"react";
const Add=(props)=>{
    const[newName,setNewName]=React.useState('');
    const[newTitle,setNewTitle]=React.useState('');
    const[newPicLink,setNewPicLink]=React.useState('');

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
            name:newName,
            manager_id:props.selectedEmp.id,
            title:newTitle,
            pic_link:newPicLink
        };
        console.log("managerId: ", newEmp.manager_id);
        fetch("api/create",{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newEmp)
        })
        .then(res=>res.json())
        .then(json=>{
            props.setEmployees(json);
        })
        .catch(err=>console.log(err));
    }
    
    return(
        <div className={props.addWasClicked?null:"form-popup"} id="myForm">
            <form action="/action_page.php" className="form-container">
                <h1>Add Employee</h1>
                <label htmlFor="text"><b>Name</b></label>
                <input id="name"type="text" placeholder="Enter Name"value={newName}onChange={e=>setNewName(e.target.value)} required />
                <label htmlFor="text"><b>Job Title</b></label>
                <input id="title"type="text" placeholder="Enter Title"value={newTitle}onChange={e=>setNewTitle(e.target.value)} required />
                <label htmlFor="text"><b>Picture Link</b></label>
                <input type="text"placeholder="Enter a website link for a picture"value={newPicLink}onChange={e=>setNewPicLink(e.target.value)} />
                <label htmlFor="text"><b>Manager</b></label>
                <input id="managerName"type="text"placeholder="Enter Manager"value={props.selectedEmp?props.selectedEmp.name:''}readOnly />
                <label htmlFor="text"><b>Manager Identification Number</b></label>
                <input id="managerId"type="text" placeholder="Enter Manager Identification Number"value={props.selectedEmp?props.selectedEmp.id:''}readOnly />
                <button type="button" className="btn" onClick={createEmp}>Create</button>
                <button type="button" className="btn cancel" onClick={props.closeAdd}>Cancel</button>
            </form>
        </div>
    );
}
export{Add};