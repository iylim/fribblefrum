import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import {Switch} from 'react-router-dom';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import QuestionAnswer from '../../components/QuestionAnswer/QuestionAnswer';

class GamePage extends Component {
constructor() {
  super();
  this.state = {
    answer: ''
  }
}
 
  render() {
    return (
      <div className='GamePage'>
        <div className='Directions'> Its a battle of wits. <br /> Try to best your opponent! <br /> Your fellow players will determine the winner.</div>
        <Switch>
        <QuestionForm {...this.props} room={this.props.room} answer={this.state.answer} />
        <QuestionAnswer {...this.props} room={this.props.room} answer={this.state.answer} />
       </Switch>      
       </div>
    );
  }
}

export default GamePage;