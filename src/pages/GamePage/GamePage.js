import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import {Route, Switch} from 'react-router-dom';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import QuestionAnswer from '../../components/QuestionAnswer/QuestionAnswer';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      player: props.room.players.find(p => p.userId === props.user._id)
    })
  }

  playAgain = () => {
    roomsAPI.playAgain();
  }
  render() {
    
    return (
      <div className="GamePage">
        <div className='GameRoomInfo'> Room# {this.props.room.roomId}</div>
        <div className="Direction"> Its a battle of wits. <br /> Try to best your opponent! <br /> Your fellow players will determine the winner.</div>
        <QuestionAnswer user={this.props.user} room={this.props.room} player={this.state.player} />
        {/* <QuestionForm user={this.props.user} room={this.props.room} player={this.state.player} /> */}
    </div>
  )
  }
}

export default GamePage;