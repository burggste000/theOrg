import"./delete.css";
const Delete=(props)=>{
    const deleteEmp=()=>{
        if(props.selectedEmp.directs)
            props.selectedEmp.directs=null;
            props.selectedEmp.manager=null;
            console.log(props.selectedEmp);
        if(!props.selectedEmp)
            return;
        fetch("api/delete",{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(props.selectedEmp)})
        .then(res=>res.json())
        .then(json=>{
            props.setEmployees(json);
        })
        .catch(err=>console.log(err));
    }
    return(
        <div className={props.deleteWasClicked?null:"form-popup"} id="myForm2">
            <form action="/action_page.php" className="form-container">
                <h1>Delete Employee</h1>
                <label htmlFor="text"><b>Identification Number</b></label>
                <input id="id2"type="text"value={props.selectedEmp?props.selectedEmp.id:''}readOnly />
                <label htmlFor="text"><b>Name</b></label>
                <input id="name2"type="text"value={props.selectedEmp?props.selectedEmp.name:''}readOnly />
                <label htmlFor="text"><b>Job Title</b></label>
                <input id="title2"type="text"value={props.selectedEmp?props.selectedEmp.title:''}readOnly />
                <button id="deleteBtn"type="button"className="btn"onClick={deleteEmp}>Delete</button>
                <button type="button"className="btn cancel"onClick={props.closeDelete}>Cancel</button>
            </form>
      </div>
    );
}
export{Delete};