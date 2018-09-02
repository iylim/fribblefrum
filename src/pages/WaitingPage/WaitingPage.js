import React, { Component } from 'react';
import roomsAPI from '../../utils/roomsAPI';
import './WaitingPage.css';

class WaitingPage extends Component {

    startGame = () => {
        roomsAPI.startGame();
    }
    
      render() {
      return (
        this.props.room && 
        <div className="WaitingRoom">
            <h3>Room Id: {this.props.room.roomId} </h3>
            <p className="pulse">Waiting for more players...</p>
            <button onClick={this.startGame} disabled={this.props.room.players.length < 3} >Start Game</button>
        </div>
    )}
}

export default WaitingPage;