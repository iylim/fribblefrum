import React, {Component} from 'react';
import QuestionForm from '../../components/QuestionForm/QuestionForm';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: props.room.players.find(p => p.userId === props.user._id)
    };
  }

  render() {
    var player = this.props.room.players.find(p => p.userId === this.props.user._id);
    return (
      <div className="GamePage">
        <div className='GameRoomInfo'> Room# {this.props.room.roomId}</div>
        <div className="Direction"> Its a battle of wits. <br /> Try to best your opponent! <br /> Your fellow players will determine the winner.</div>
        {!player.prompts[0].answer && <QuestionForm user={this.props.user} room={this.props.room} player={player} />}
        <div>{this.props.room && this.props.room.players.reduce((count, p) => p.prompts[0].answer ? count + 1: count, 0)} of {this.props.room.players.length} players have answered</div>
    </div>
    )
  }
}

export default GamePage;