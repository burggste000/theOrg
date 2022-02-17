import"./header.css";

const Header=()=>{
    return(
        <header>
            <div id="btnDiv">
                <input type="file" id="fileUpload" />
                <input type="button" id="upload" className="menu"value="Upload" />
                <input id="addBtn" type="button" value="Add Employee" className="menu" />
                <input type="button" value="Delete Employee" className="menu" />
                <a href="/api/csv"id="downloadCSV"className="menu"download="org.csv">Download</a>
            </div>
        </header>
    );
}
export{Header};