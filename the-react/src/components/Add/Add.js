const Add=()=>{
    return(
        <div class="form-popup" id="myForm">
            <form action="/action_page.php" class="form-container">
                <h1>Add Employee</h1>
                <label for="text"><b>Name</b></label>
                <input id="name"type="text" placeholder="Enter Name" required />
                <label for="text"><b>Job Title</b></label>
                <input id="title"type="text" placeholder="Enter Title" required />
                <label for="text"><b>Manager</b></label>
                <input id="managerName"type="text" placeholder="Enter Manager" readonly />
                <label for="text"><b>Manager Identification Number</b></label>
                <input id="managerId"type="text" placeholder="Enter Manager Identification Number" readonly />
                <button type="button" class="btn" onclick="createEmp()">Create</button>
                <button type="button" class="btn cancel" onclick="closeForm()">Cancel</button>
            </form>
        </div>
    );
}
export{Add};