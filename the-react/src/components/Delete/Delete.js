import"./delete.css";
const Delete=(props)=>{
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
                <button id="deleteBtn"type="button"className="btn"onClick={props.deleteEmp}>Delete</button>
                <button type="button"className="btn cancel"onClick={props.closeDelete}>Cancel</button>
            </form>
      </div>
    );
}
export{Delete};