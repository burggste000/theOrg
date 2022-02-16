import"./header.css";

const Header=()=>{
    return(
        <header>
            <div id="btnDiv">
                <input type="file" id="fileUpload" />
                <input type="button" id="upload" class="menu"value="Upload" />
                <input id="addBtn" type="button" value="Add Employee" class="menu" />
                <input type="button" value="Delete Employee" class="menu" />
                <a href="/api/csv"id="downloadCSV"class="menu"download="org.csv">Download</a>
            </div>
        </header>
    );
}
export{Header};