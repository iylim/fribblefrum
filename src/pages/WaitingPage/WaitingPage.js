//start game button, component did mount gets room data.

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import roomsAPI from '../../utils/roomsAPI';

class WaitingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          room: null
        }
      }

    startGame = () => {
        //go to gamepage
    }

    componentDidMount() {
        roomsAPI.getRoom(this.props.match.params.id)
        .then(room => {
            this.setState({room});
        });
    }

    render() {
      return (
        this.state.room && 
        <div className="WaitingRoom">
            Room Id: {this.state.room.roomId} <br />
            Waiting for more players...<br />
            <Link to="/dashboard">Back</Link><br />
            <button onClick={this.startGame} disabled={this.state.room.players.length < 3} >Start Game</button>
        </div>
    )}
}

export default WaitingPage;