import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import {Link, Switch} from 'react-router-dom';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer1: '',
      answer2: '',
      answerNeeded: (props.room.players.length * 2)
    }
  }
  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    roomsAPI.submitAnswer(this.state);
    this.setState({answerNeeded: this.state.answerNeeded - 2})
    this.props.history.push('/result');
  // when (answerNeeded === 0) go to the answer page
  }

  render() {
    return (
      <div className='GameForm'>
      <div className='GameRoomInfo'> 
        Room# {this.props.room.roomId}
      </div>
       <div className="waiting"> {this.state.answerNeeded} Questions left to be answered. </div>
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group"> {this.props.player.prompts[0].question}</div>          
          <div className="form-group">
          <div className="col-sm-12"><textarea className="Answer" placeholder="Enter Response Here..." onChange={(e) => this.handleChange('answer1', e)} />
          </div></div><br />
        <div className="form-group"> {this.props.player.prompts[1].question}</div>          
          <div className="form-group">
          <div className="col-sm-12"><textarea className="Answer" placeholder="Enter Response Here..." onChange={(e) => this.handleChange('answer2', e)} />
          <input type="submit" value="Submit" /></div>
        </div>
      </form>
      </div>
    );
  }
}

export default QuestionForm;