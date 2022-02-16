import"./delete.css";

const Delete=()=>{
    return(
        <div class="form-popup" id="myForm2">
            <form action="/action_page.php" class="form-container">
                <h1>Delete Employee</h1>
                <label for="text"><b>Identification Number</b></label>
                <input id="id2"type="text"readonly />
                <label for="text"><b>Name</b></label>
                <input id="name2"type="text"readonly />
                <label for="text"><b>Job Title</b></label>
                <input id="title2"type="text"readonly />
                <button id="deleteBtn"type="button" class="btn" onclick="deleteEmp()">Delete</button>
                <button type="button" class="btn cancel" onclick="closeForm2()">Cancel</button>
            </form>
      </div>
    );
}
export{Delete};