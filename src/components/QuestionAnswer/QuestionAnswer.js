import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import {Link, Switch} from 'react-router-dom';

class QuestionAnswer extends Component {

  render() {
    return (
      <div className='QuestionAnswer'>
      <div className='GameRoomInfo'> 
      Room# {this.props.room.roomId}
      </div>
      </div>
    );
  }
}

export default QuestionAnswer;