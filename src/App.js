import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import Home from './components/pages/Home'
import UserContext from './context/userContext';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
