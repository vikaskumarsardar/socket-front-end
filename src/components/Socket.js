import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "../css/socket.css";
const socket = io("http://localhost:5000");

export default function Socket({ setLogged }) {
  const [messageArray, setMessageArray] = useState([]);
  let userDetails;
  const [data, setData] = useState({
    username: "",
    message: "",
    createdAt: Date(),
    id: "",
  });
  useEffect(() => {
    async function isVerified() {
      try {
        const isUserAuthenticated = await axios.post(
          "http://localhost:5000/api/messages/getAllMessages",
          {},
          {
            withCredentials: true,
          }
        );
        setMessageArray(isUserAuthenticated.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    isVerified();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = JSON.parse(localStorage.getItem("user"));
    userDetails = { ...details, createdAt: Date(), message: data.message };
    setMessageArray((res) => [userDetails, ...res]);
    socket.emit("chat message", userDetails);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    userDetails = { ...userDetails, message: value };
    setData(userDetails);
  };

  socket.on("chat message", (incomingData) => {
    setMessageArray([incomingData, ...messageArray]);
  });

  const logOut = () => {
    document.cookie
      .split(";")
      .map((res) => {
        if (res.trim().startsWith("token") && !res.trim().endsWith("=")) {
          res = "token=";
        }
        document.cookie = res;
      })
    setLogged(false);
  };

  return (
    <div className="App">
      <button onClick={logOut}>
        <p>logOut</p>
      </button>
      <h5>Messsaging App</h5>
      <form onSubmit={handleSubmit} spellCheck={false}>
        <input type="text" onChange={handleChange} />
      </form>
      <div id="messages">
        <h5>{messageArray.length}</h5>
        {messageArray.map((res, id) => {
          return (
            <span key={id}>
              <p>{new Date(res.createdAt).toLocaleTimeString()}</p>
              <p>{res.username}</p>
              <h5>{res.message}</h5>
            </span>
          );
        })}
      </div>
    </div>
  );
}
