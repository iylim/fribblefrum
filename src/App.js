import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header><h1>Fribble Frum</h1></header>
        <Router>
          <Route path="/" render={() => <Home />} />
        </Router>
      </div>
    );
  }
}

export default App;
