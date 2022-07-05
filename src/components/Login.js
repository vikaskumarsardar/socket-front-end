import React, { useState, } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
export default function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
    countryCode: "",
  });
  const navigate = useNavigate()
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
        "http://localhost:9000/api/messages/login",
        data
      );
      setData({
        username: "",
        password: "",
        countryCode: "",
      });


      if(result.data){
        navigate("/socket")
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    </>
  );
}
