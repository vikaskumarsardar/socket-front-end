import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as BR,Route,Routes } from "react-router-dom";
import Login from './components/Login'
import Socket from "./components/Socket";
function App() {


  return(
    <BR>
    <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/socket" element={<Socket/>} />
    </Routes>
    </BR>

  )
}

export default App;
