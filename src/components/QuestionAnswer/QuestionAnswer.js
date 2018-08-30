import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';

class QuestionAnswer extends Component {  
constructor(props) {
  super(props);
  this.state = ({
    
  })
}
//build data structures of
//question and 2 answers votes
  //match question of the index show

submitVote = (e) => {
  //send API put request
  // roomsAPI.getVotes();
} 

render() { 

    return (
      <div className='QuestionAnswer'>
      {this.props.room.questions[0]}<br />
      <button onClick={(e) => this.submitVote(e)}> {this.props.room.players[0].prompts[0].answer} </button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={(e) => this.submitVote(e)}> {this.props.room.players[this.props.room.players.length-1].prompts[1].answer} </button>
      <br />
    
      </div>
    );
  }
}

export default QuestionAnswer;