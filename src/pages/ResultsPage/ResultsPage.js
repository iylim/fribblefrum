import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import { Link } from 'react-router-dom';
import Results from '../../components/Results/Results';
import './ResultsPage.css';

class ResultsPage extends Component {      
  playAgain = () => { 
    roomsAPI.playAgain();
  }

  render() {   
    var playerQuestions = [];
    this.props.room.players.forEach(player => {
        player.prompts.forEach(prompt => {
            playerQuestions.push({
                question: prompt.question,
                playerName: player.name,
                answer: prompt.answer,
                votes: prompt.votes.length
            }); 
        });
    }); 
    var questions = [];
    playerQuestions.forEach(question => {
        var q = questions.find(quest => quest.question === question.question);
        if (q) {
            q.answers.push({
                answer: question.answer,
                playerName: question.playerName,
                votes: question.votes
            });
        } else {
            questions.push({
                question: question.question,
                answers: [{
                    answer: question.answer,
                    playerName: question.playerName,
                    votes: question.votes
                }]
            });
        }
    });

    return (
        <div className="Results">
        <h3>Results</h3>
        <table className="table">
            {questions.map(q => {
                return(
                    <Results key={q.playerName} q={q} />
                )
            })}
        </table>              
        <div className="end">    
            <h3>Winner: {this.props.user.name}</h3>
            <Link to="/" onClick={()=>this.playAgain()}>Home</Link>
        </div>
      </div>
    );
  }
}

export default ResultsPage;