import"./delete.css";
const deleteEmp=()=>{
    console.log("deleteEmp");
}
const closeForm2=()=>{
    console.log("closeForm2");
}
const Delete=()=>{
    return(
        <div className="form-popup" id="myForm2">
            <form action="/action_page.php" className="form-container">
                <h1>Delete Employee</h1>
                <label htmlFor="text"><b>Identification Number</b></label>
                <input id="id2"type="text"readOnly />
                <label htmlFor="text"><b>Name</b></label>
                <input id="name2"type="text"readOnly />
                <label htmlFor="text"><b>Job Title</b></label>
                <input id="title2"type="text"readOnly />
                <button id="deleteBtn"type="button" className="btn" onClick={deleteEmp}>Delete</button>
                <button type="button" className="btn cancel" onClick={closeForm2}>Cancel</button>
            </form>
      </div>
    );
}
export{Delete};