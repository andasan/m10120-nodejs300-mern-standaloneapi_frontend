import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import Home from './components/pages/Home'
import Login from './components/auth/Login'
import UserContext from './context/userContext';
import Register from './components/auth/Login';
import Header from './components/Header';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        "http://localhost:8080/users/tokenIsValid", 
        null, 
        {
          headers: { "x-auth-token": token }
        }
      );

      if(tokenRes.data){
        const userRes = await Axios.get(
          "http://localhost:8080/users/", 
          { headers: { "x-auth-token": token }
        })
        setUserData({
          token: token,
          user: userRes.data
        })
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
