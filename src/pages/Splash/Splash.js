import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Splash extends Component {
 
  render() {
    return (
      <div className="App">
        <header><h1>Fribble Frum</h1></header>
        <Link to='/login'> Login </Link> &nbsp; | &nbsp;
        <Link to='/signup'> Signup </Link>
      </div>
  )}
}

export default Splash;