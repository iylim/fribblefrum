import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import {Route, Switch} from 'react-router-dom';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import QuestionAnswer from '../../components/QuestionAnswer/QuestionAnswer';

var gameState;

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      player: props.room.players.find(p => p.userId === props.user._id),
      answerNeeded: (props.room.players.length * 2),
      form: true
    })
  }

  updateForm = () => {
    this.setState({form: false});
  }

  render() {
    if (this.props.room.answerNeeded === 0) {
      var gameState = <QuestionAnswer user={this.props.user} room={this.props.room} />
    }

    return (
      <div className="GamePage">
        <div className="Direction"> Its a battle of wits. <br /> Try to best your opponent! <br /> Your fellow players will determine the winner.</div>
        { this.state.form ? <QuestionForm user={this.props.user} player={this.state.player} room={this.props.room} updateForm={this.updateForm}/> : <div className="waiting"> {this.props.room.answerNeeded} Questions left to be answered. </div> }
        {gameState} 
    </div>
  )
  }
}

export default GamePage;