import React, { useState, } from "react";
import {Navigate, useNavigate} from 'react-router-dom'
import axios from "axios";
import Socket from "./Socket";
export default function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
    countryCode: "",
  });

  const navigate = useNavigate()
  const [logged,setLogged] = useState(false)
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((res) => {
      return {
        ...res,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        "http://localhost:5000/api/messages/login",
        data
      );
      localStorage.setItem('token',JSON.stringify(result.data.data.accessToken))
      setData({
        username: "",
        password: "",
        countryCode: "",
      });


      if(result.data){
        // setLogged(true)
        // navigate('/socket')
      }
    } catch (error) {
      console.log("login Error", error);
    }
  };
  const handleClick = async() =>{
    try{

      const result = await axios.post("http://localhost:5000/api/messages/test",{},{
        headers : {
          "authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      console.log("result" ,result);
    }catch(error){
      console.log("test Error",error);
    }
  }
  
  

  return (
    <>
      <form onSubmit={handleSubmit} spellCheck="false">
        <input
          type="text"
          onChange={handleChange}
          value={data.username}
          placeholder="username"
          name="username"
        />
        <input
          type="text"
          onChange={handleChange}
          value={data.password}
          placeholder="password"
          name="password"
        />
        <input
          type="text"
          onChange={handleChange}
          value={data.countryCode}
          placeholder="countryCode"
          name="countryCode"
        />
        <button type="submit">Submit Now</button>
      </form>
      <button onClick={handleClick}>click now</button>
    </>
  );
}
