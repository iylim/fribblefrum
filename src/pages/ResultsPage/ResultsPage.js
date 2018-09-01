import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import { Link } from 'react-router-dom';
import Result from '../../components/Result/Result';
import TopScore from '../../components/TopScore/TopScore';
import './ResultsPage.css';

class ResultsPage extends Component {      
  playAgain = () => { 
    roomsAPI.done();
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

    var totalVotes = [];
    playerQuestions.forEach(p => {
    var player = totalVotes.find(pl => p.playerName === pl.player);
        if (player) {
            player.player = player.player;
            player.votes = player.votes + p.votes;
        } else {
            totalVotes.push({
                player: p.playerName,
                votes: p.votes
            })
        }   
    });

    totalVotes.sort((a, b) => a.votes < b.votes);
    
    return (
        <div className="Results">   
            <h3>Results</h3>
        {totalVotes.map(obj => {
            return(
            <TopScore key={obj.player} obj={obj}/>
        )
    })}

        <table className="table">
            {questions.map(q => {
                return(
                    <Result key={q.playerName} q={q} />
                )
            })}
        </table>              
            <button onClick={()=>this.playAgain()}>Home</button>
            </div>
    );
  }
}

export default ResultsPage;