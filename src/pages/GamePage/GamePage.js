import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import {Switch} from 'react-router-dom';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import QuestionAnswer from '../../components/QuestionAnswer/QuestionAnswer';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      player: props.room.players.find(p => p.userId === props.user._id)
    })
  }

  render() {
    console.log(this.state.player)
    return (
      <div className='GamePage'>
        <div className='Directions'> Its a battle of wits. <br /> Try to best your opponent! <br /> Your fellow players will determine the winner.</div>
        <Switch>
        <QuestionForm {...this.props} room={this.props.room} player={this.state.player} />
        <QuestionAnswer {...this.props} room={this.props.room} player={this.state.player} user={this.props.user} />
       </Switch>      
       </div>
    );
  }
}

export default GamePage;