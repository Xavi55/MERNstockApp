import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Login from './routes/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
}

export default App;
