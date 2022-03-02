import"./header.css";
import React from"react";
const Header=(props)=>{

    const loadData = str => {
        let arrEmployees = [];
        let rows = str.split("\n");
        for (let i = 1; i < rows.length; ++i) {
            if(!rows[i].length){
                continue;
            }
            let cells = rows[i].split(",");    
            let employee={
                id:cells[0].trim(),
                name:cells[1].trim(),
                manager_id:cells[2].trim(),
                title: cells[3].trim(),
                pic_link: cells[4].trim()
            };
            arrEmployees.push(employee);
        }
        return arrEmployees;
    }   

    const upload=(fileUploaded)=>{

        let reader = new FileReader();
        reader.onload=e=>{    
        
            const serversArr=loadData(e.target.result);

            fetch("api/employees",
            {
                method:'post',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(serversArr)
            })
            .then(res=>{ console.log("Uploaded, converting JSON..."); res.json(); })
            .then(json=>{
                console.log("Saving employees.");
                props.setEmployees(json);
            })
            .catch(err => console.log(err));
        }
        console.log("Uploading...");
        reader.readAsText(fileUploaded);

    }

    
    const hiddenFileInput=React.useRef(null);

    const handleClick=async(event)=>{
        props.setDeleteWasClicked(false);
        props.setAddWasClicked(false);
        await hiddenFileInput.current.click();
    };

    const handleChange=event=>{
        const fileUploaded=event.target.files[0];
        upload(fileUploaded);
    };



    return(
        <header>
            <div id="btnDiv">
                <input type="file" id="fileUpload"ref={hiddenFileInput}onChange={handleChange} />
                <input type="button" id="upload" className="menu"value="Upload"onClick={handleClick} />
                <input id="addBtn" type="button" value="Add Employee" className="menu"onClick={()=>props.bringAdd()} />
                <input type="button" value="Delete Employee" className="menu"onClick={()=>props.bringDelete()} />
                {/* <a href="/api/csv" id="downloadCSV"className="menu"download="org.csv">Download</a> */}
                <a href="http://localhost:3001/api/csv" id="downloadCSV"className="menu"download="org.csv">Download</a>
            </div>
        </header>
    );
}
export{Header};