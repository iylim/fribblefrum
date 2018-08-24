import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
      return (
        <div className="App">
          <header><h1>Fribble Frum</h1></header>
          <Link to="/">Home</Link>
        </div>
    )}
}

export default Home;