import './App.css';
import React from"react";
//The commented stuff, Dad had me put in to have the server interactable with the front-end.
export default function App() {
    // const[data,setData]=React.useState(null);
    // React.useEffect(()=>{
    //     fetch("/users")
    //     .then((res)=>res.json())
    //     .then((json)=>setData(json));
    // });
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

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //   <p>{!data?"Loading...":"name: "+data.name}</p>
    // </div>
  );
}