import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Splash.css';

class Splash extends Component {
 
  render() {
    return (
      <div className="App">
        <header className="jackInTheBox"><h1>Fribble Frum</h1></header>
        <Link to='/login'> Login </Link> &nbsp; | &nbsp;
        <Link to='/signup'> Signup </Link><br /><br />
        <div className="orientation">
          <img src="https://i.imgur.com/UXvEqSo.png" />
        </div>
        <audio autoPlay loop>
          <source src="http://freesound.org/data/previews/369/369920_2402876-lq.mp3" />
        </audio>
      </div>
  )}
}

export default Splash;