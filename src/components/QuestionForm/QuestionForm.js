import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import {Link, Switch} from 'react-router-dom';

class QuestionForm extends Component {

  render() {
    console.log(this.props.room.questions)
    return (
      <div className='GameForm'>
      <div className='GameRoomInfo'> 
      Room# {this.props.room.roomId}
      </div>
      
      </div>
    );
  }
}

export default QuestionForm;