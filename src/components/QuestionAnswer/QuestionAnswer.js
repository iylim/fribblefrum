import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';

class QuestionAnswer extends Component {  
constructor(props) {
  super(props);
  this.state = ({
    votes: 0
  })
}
  


submitVote = () => {
  
  //send API put request
  roomsAPI.getVotes();
} 

render() { 
  // if player answered, disable vote buttons 
  
    return (
      <div className='QuestionAnswer'>
      {this.props.room.questions[0]}<br />
      <button onClick="submitVote"> {this.props.room.players[0].prompts[0].answer} </button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick="submitVote"> {this.props.room.players[this.props.room.players.length-1].prompts[1].answer} </button>
      <br />
    
      </div>
    );
  }
}

export default QuestionAnswer;