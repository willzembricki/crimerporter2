import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import LineGraph from "./components/LineGraph";
// import LineGraph from "./components/LineGraph";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [graphData, setGraphData] = useState([]);
  const [lineLabels, setLineLabels] = useState([]);

  function onGraphSubmit(resData) {
    console.log(resData);
    setGraphData([...graphData, resData[1]]);
    setLineLabels([...lineLabels, resData[0]]);
  }

  // if this causes a "flicker" you can swap it for useLayoutEffect instead of useEffect
  useEffect(() => {
    loginStatus();
  }, []);

  function loginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((res) => {
        if (res.data.logged_in) {
          console.log(res);
          handleLogin(res);
        } else {
          console.log(res);
          handleLogout();
        }
      })
      .catch((error) => console.log("api error:", error));
  }

  function handleLogin(data) {
    setIsLoggedIn(true);
    setUser(data.user);
    console.log(isLoggedIn, user);
  }
  function handleLogout() {
    setIsLoggedIn(false);
    setUser({});
    console.log(isLoggedIn, user);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Home
                handleLogout={handleLogout}
                user={user}
                isLoggedIn={isLoggedIn}
              />
            )}
          />
          <Route
            exact
            path="/login"
            component={() => <Login handleLogin={handleLogin} />}
          />
          <Route
            exact
            path="/signup"
            component={() => <Signup handleLogin={handleLogin} />}
          />
          <Route
            exact
            path="/line"
            component={() => (
              <LineGraph
                isLoggedIn={isLoggedIn}
                charData={graphData}
                labelArr={lineLabels}
                handleGraphSubmit={onGraphSubmit}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
