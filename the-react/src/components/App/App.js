import'./app.css';
import React from"react";
import{Header}from"../Header/Header.js";
import{Chart}from"../Chart/Chart.js";
import{Add}from"../Add/Add.js";
import{Delete}from"../Delete/Delete.js";
//The commented stuff, Dad had me put in to have the server interactable with the front-end.
export default function App() {
    // const[data,setData]=React.useState(null);
    // React.useEffect(()=>{
    //     fetch("/users")
    //     .then((res)=>res.json())
    //     .then((json)=>setData(json));
    // });
    // put stuff here ???
  return(
    <>
        <Header />
        <Add />
        <Delete />
        <Chart />
    </>

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