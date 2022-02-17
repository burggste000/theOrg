import"./add.css";
const Add=()=>{
    const createEmp=()=>{
        console.log("createEmp");
    }
    const closeForm=()=>{
        console.log("closeForm");
    }
    return(
        <div className="form-popup" id="myForm">
            <form action="/action_page.php" className="form-container">
                <h1>Add Employee</h1>
                <label htmlFor="text"><b>Name</b></label>
                <input id="name"type="text" placeholder="Enter Name" required />
                <label htmlFor="text"><b>Job Title</b></label>
                <input id="title"type="text" placeholder="Enter Title" required />
                <label htmlFor="text"><b>Manager</b></label>
                <input id="managerName"type="text" placeholder="Enter Manager" readOnly />
                <label htmlFor="text"><b>Manager Identification Number</b></label>
                <input id="managerId"type="text" placeholder="Enter Manager Identification Number" readOnly />
                <button type="button" className="btn" onClick={createEmp}>Create</button>
                <button type="button" className="btn cancel" onClick={closeForm}>Cancel</button>
            </form>
        </div>
    );
}
export{Add};