import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import {Route, Switch} from 'react-router-dom';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import QuestionAnswer from '../../components/QuestionAnswer/QuestionAnswer';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      player: props.room.players.find(p => p.userId === props.user._id),
      
    })
  }

  render() {
    return (
      <div className="GamePage">
          <div className="Direction"> Its a battle of wits. <br /> Try to best your opponent! <br /> Your fellow players will determine the winner.</div>
          <QuestionForm {...this.props} room={this.props.room} player={this.state.player} user={this.props.user} />
          <QuestionAnswer {...this.props} room={this.props.room} player={this.state.player} user={this.props.user} />
    </div>
    )
  }
}

export default GamePage;