import React, { useState ,useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Socket from "./Socket";
export default function Login() {
  const [details, setDetails] = useState({
    username: "",
    id: "",
  });
  const [logged, setLogged] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    countryCode: "",
  });

  
  useEffect(() => {
  document.cookie.split(';').filter(res=>{
    res.trim().startsWith('token') && !res.endsWith('=') && (setLogged(true))
  })
  }, [])
  
  
  

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
      setData({
        username: "",
        password: "",
        countryCode: "",
      });
      if (result.data.data) {
        localStorage.setItem("user",JSON.stringify({ 
          username: result.data.data.username,
          id : result.data.data.id
         }));
        document.cookie =`token=${result.data.data.accessToken}`;
        setLogged(true);
      }
    } catch (error) {
      console.log("login Error", error);
    }
  };
  const handleClick = async () => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/messages/test",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("result", result);
    } catch (error) {
      console.log("test Error", error);
    }
  };

  return logged ? (
    <Socket setLogged={setLogged} />
  ) : (
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
