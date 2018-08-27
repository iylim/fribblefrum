//start game button, component did mount gets room data.

import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class WaitingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          roomId: '',
          players: []
        }
      }

    startGame = () => {
        // this.props.history.push(`/game/${id}`);
    }
    componentDidMount() {
        this.setState({
           
        });
    }

    render() {
      return (
        <div className="WaitingRoom">
            Waiting for more players...<br />
            <Link to="/dashboard">Back</Link><br />
            <button onClick={this.startGame} disabled={this.state.players.length < 3} >Start Game</button>
        </div>
    )}
}

export default WaitingPage;