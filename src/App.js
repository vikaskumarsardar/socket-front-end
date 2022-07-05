import React, { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:9000");
function App() {
  const [messageArray, setMessageArray] = useState([]);
  const [data,setData] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageArray(res=>[data,...res])
    socket.emit("chat message", data);
  };
  
  const handleChange = (e) => {
    const { value } = e.target;
    setData(value);
  };

  socket.on("chat message", (incomingData) =>{
    setMessageArray([incomingData,...messageArray])
  } )

  return (
    <div className="App">
      <h2>hero hoon main</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
          </form>
        <div>
          <h2>{messageArray.length}</h2>
        {messageArray.map((res,id)=>{
          return (<h2 key={id}>{res}</h2>)
        })}
        </div>
    </div>
  );
}

export default App;
