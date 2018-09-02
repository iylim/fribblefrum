import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer1: '',
      answer2: ''
    };
  }

  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    roomsAPI.submitAnswer({
      answer1: this.state.answer1,
      answer2: this.state.answer2
    });
  }
  
  render() {
    return (
      <div className='GameForm'>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group"> {this.props.player.prompts[0].question}</div>          
            <div className="form-group">
              <div className="col-sm-12"><textarea maxLength="100" rows="4" cols="50" className="Answer" placeholder="Enter Response Here..." onChange={(e) => this.handleChange('answer1', e)} /></div>
            </div>
          <div className="form-group"> {this.props.player.prompts[1].question}</div>          
            <div className="form-group">
              <div className="col-sm-12"><textarea maxLength="100" rows="4" cols="50" className="Answer" placeholder="Enter Response Here..." onChange={(e) => this.handleChange('answer2', e)} /></div>
              <input disabled={!this.state.answer1 || !this.state.answer2} type="submit" value="Submit" />
            </div>
        </form>
      </div>
    );
  }
}

export default QuestionForm;