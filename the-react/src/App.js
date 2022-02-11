import logo from './logo.svg';
import './App.css';
import React from"react";

function App() {
    const[data,setData]=React.useState(null);
    React.useEffect(()=>{
        fetch("/users")
        .then((res)=>res.json())
        .then((json)=>setData(json));
    });
  return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>{!data?"Loading...":"name: "+data.name}</p>
    </div>
  );
}

export default App;
