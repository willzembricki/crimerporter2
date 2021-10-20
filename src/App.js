import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  
  // if this causes a "flicker" you can swap it for useLayoutEffect instead of useEffect
  useEffect(()=> {
    loginStatus()
  },[])
  
  function loginStatus(){
    axios.get('http://localhost:3001/logged_in',{withCredentials:true})
    .then(res =>{
      if (res.data.logged_in){
        handleLogin(res)
      }
      else{
        handleLogout()
      }
    })
    .catch(error => console.log('api error:', error))
  }

  function handleLogin(data){
    setIsLoggedIn(true)
    setUser(data.user)
  }
  function handleLogout(){
    setIsLoggedIn(false)
    setUser({})
  }

  return (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={}/>
        <Route exact path='/login' component={}/>
        <Route exact path='/signup' component={}/>
     </Switch>
    </BrowserRouter>
    <Login handleLogin = {handleLogin}/>
  </div>
  );
}

export default App;
