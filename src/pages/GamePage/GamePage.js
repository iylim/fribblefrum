import React, {Component} from 'react';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import GameInstruction from '../../components/GameInstruction/GameInstruction';
import './GamePage.css';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: props.room.players.find(p => p.userId === props.user._id),
      isHidden: false
    };
  }
  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  render() {
    var player = this.props.room.players.find(p => p.userId === this.props.user._id);
    return (
      <div className="GamePage">
        <div className='GameRoomInfo'> Room# <br />{this.props.room.roomId}</div>
        <div className="Instructions">
          {!this.state.isHidden && <GameInstruction toggleHidden={this.toggleHidden} isHidden={this.state.isHidden}/>}
        </div>
        {this.state.isHidden && 
        <div className="gamePrompt">
        <button onClick={this.toggleHidden}>Show Instructions</button>
        {!player.prompts[0].answer && <QuestionForm user={this.props.user} room={this.props.room} player={player} />}
        <div>{this.props.room && this.props.room.players.reduce((count, p) => p.prompts[0].answer ? count + 1: count, 0)} of {this.props.room.players.length} players have answered</div>
        </div>
        }
    </div>
    )
  }
}

export default GamePage;