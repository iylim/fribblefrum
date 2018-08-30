import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import {Link, Switch} from 'react-router-dom';
import QuestionAnswer from '../../components/QuestionAnswer/QuestionAnswer';


class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer1: '',
      answer2: '',
      answerNeeded: (props.room.players.length * 2),
      form: true
    }
  }

  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value
    })
  }

  updateForm = () => {
    this.setState({form: false});
  }

  handleSubmit = (e) => {
    roomsAPI.submitAnswer(this.state);
    this.updateForm();
  }
  
  render() {
    if (this.props.room.answerNeeded === 0) 
    var gameState = <QuestionAnswer user={this.props.user} room={this.props.room} />

    return (
      <div className='GameForm'>
        {this.state.form ?  
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group"> {this.props.player.prompts[0].question}</div>          
              <div className="form-group">
                <div className="col-sm-12"><textarea className="Answer" placeholder="Enter Response Here..." onChange={(e) => this.handleChange('answer1', e)} /></div>
              </div><br />
            <div className="form-group"> {this.props.player.prompts[1].question}</div>          
              <div className="form-group">
                <div className="col-sm-12"><textarea className="Answer" placeholder="Enter Response Here..." onChange={(e) => this.handleChange('answer2', e)} />
                <input type="submit" value="Submit" /></div>
              </div>
          </form>
        : 
        <div className="waiting"> {this.props.room.answerNeeded} Questions left to be answered. </div> }
      {gameState} 
      </div>
    );
  }
}

export default QuestionForm;