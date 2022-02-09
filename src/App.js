import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
