import React, { Component } from 'react';
//import { Route, Switch } from 'react-router-dom';

import Routes from './routes/Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes/>
      </div>
    );
  }
}

export default App;
