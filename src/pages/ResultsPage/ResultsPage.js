import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import { Link } from 'react-router-dom';
import './ResultsPage.css';

class ResultsPage extends Component {      
  playAgain = (roomId) => { 
    roomsAPI.playAgain(roomId);
  }

  render() {   
    var allPrompts = this.props.room.players.map(p => p.prompts); 
    var prompts = [];
      allPrompts.map(p => prompts.push(...p))
    var questions = prompts.reduce((acc, prompt) => {
        if (!acc[prompt.question]) {
            acc[prompt.question] = {
                answers: []
            };
        }
        acc[prompt.question].answers.push({
            answer: prompt.answer,
            promptId: prompt._id,
            votes: prompt.votes
        });
        return acc;
    }, {});
    var keys = Object.keys(questions);

    var question = keys.length ? {
        question: keys[0],
        answers: questions[Object.keys(questions)[0]].answers    
    } : null;

console.log(question)
    return (
      <div className="Results">
        <h3>Results</h3>
        {question ? 
        <div className="resultAnswers">
        <table>
            <th colspan="3">{question.question}</th>
            <tr className="answer-row">
              <td>{question.answers[0].answer}</td> 
              <td>{question.answers[1].answer}</td>
            </tr>
            <tr>
              <td>Player Name <br /> Votes: {question.answers[0].votes.length} </td> 
              <td>Player 2 <br /> Votes: {question.answers[1].votes.length}</td>
            </tr>
        </table>
        {/* <button onClick={}>Next</button> */}
        <button onClick={() => this.playAgain(this.props.room.roomId)}>Play Again</button>
        </div>                
        :
        <div className="end">    
            <h3>Winner: {this.props.user.name}</h3>
            <Link to="/">Home</Link>
        </div>
        }    
            
            
        
      </div>
    );
  }
}

export default ResultsPage;