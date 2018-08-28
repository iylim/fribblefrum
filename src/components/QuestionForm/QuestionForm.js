import React, {Component} from 'react';
import questionsAPI from '../../utils/questionsAPI';
import {Link, Switch} from 'react-router-dom';

class GameForm extends Component {

  render() {
    return (
      <div className='GameForm'>
      <div className='GameRoomInfo'> 
      Room# {this.props.room.roomId}
      </div>
        <h1>{this.props.question}</h1>
      </div>
    );
  }
}

export default GameForm;