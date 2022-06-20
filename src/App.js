import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
// import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import { useIdleTimer } from 'react-idle-timer'
import VolunteerRegSuccess from "./components/VolunteerRegSuccess";
import LoginAndRegistraion from "./components/LoginAndRegistration";


function App() {

  const handleOnIdle = event => {
    console.log('user is idle', event)
    console.log('last active', getLastActiveTime())
    window.location.href = "http://localhost:3000";
  }

  const handleOnActive = event => {
    console.log('user is active', event)
    console.log('time remaining', getRemainingTime())
    // logout();
  }

  const handleOnAction = (e) => {
    console.log('user did something', e)
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })
 
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginAndRegistraion/>}/>

          <Route path="volunteer" element={ <VolunteerRegSuccess/>} />
          <Route path="home/:email" element={<Home />} />
      </Routes>
      
    </div>
  );
}

export default App;
