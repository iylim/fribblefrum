import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import {Link, Switch} from 'react-router-dom';

class QuestionForm extends Component {

  handleChange = (e) => {
    this.setState({answer: e.target.value})
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    console.log(this.props.room.questions)
    return (
      <div className='GameForm'>
      <div className='GameRoomInfo'> 
        Room# {this.props.room.roomId}
      </div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter Response Here...
          <textarea className="Answer" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default QuestionForm;