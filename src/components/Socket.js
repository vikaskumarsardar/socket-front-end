import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

export default function Socket() {
  const [messageArray, setMessageArray] = useState([]);
  const [data, setData] = useState("");
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // async function isVerified(){
    //   const isUserAuthenticated = await axios.post('http://localhost:5000/api/messages/')

    // }
    
    
    setLogged(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageArray((res) => [data, ...res]);
    socket.emit("chat message", data);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setData(value);
  };

  socket.on("chat message", (incomingData) => {
    setMessageArray([incomingData, ...messageArray]);
  });

  return (
    logged && (
      <div className="App">
        <h4>Messsaging App</h4>
        <form onSubmit={handleSubmit} spellCheck={false}>
          <input type="text" onChange={handleChange} />
        </form>
        <div>
          <h2>{messageArray.length}</h2>
          {messageArray.map((res, id) => {
            return <h2 key={id}>{res}</h2>;
          })}
        </div>
      </div>
    )
  );
}
