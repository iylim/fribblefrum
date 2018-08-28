import React, { Component } from 'react';
import roomsAPI from '../../utils/roomsAPI';

class WaitingPage extends Component {

    startGame = () => {
        roomsAPI.startGame();
    }

    render() {
      return (
        this.props.room && 
        <div className="WaitingRoom">
            Room Id: {this.props.room.roomId} <br />
            Waiting for more players...<br />
            <button onClick={this.startGame} disabled={this.props.room.players.length < 3} >Start Game</button>
        </div>
    )}
}

export default WaitingPage;