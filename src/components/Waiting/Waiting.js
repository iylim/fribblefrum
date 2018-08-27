import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Waiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '',
      players: []
    }
  };

  componentDidMount() {
    roomsAPI.createRoom().then(rooms =>
    	this.setState({roomId, players})
    );
  }

    render() {
      return (
        <div className="Waiting">
          Waiting for Players... <br />
          
          <Link to='/dashboard'> Back</Link>
        </div>
    )}
}

export default Waiting;