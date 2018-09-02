import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import Result from '../../components/Result/Result';
import TopScore from '../../components/TopScore/TopScore';
import './ResultsPage.css';

class ResultsPage extends Component {      
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true
    };
  }

  toggleHidden = () => {
    this.setState({
       isHidden: !this.state.isHidden
    })
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
      <div className='GameRoomInfo'> Room# <br />{this.props.room.roomId}</div>
      <div className="tada"><h3>Results</h3></div> 
      <ol>
        {totalVotes.map(obj => {
          return(
          <li><TopScore key={obj.player} obj={obj}/></li>
          )
        })}
      </ol>
      <button onClick={this.toggleHidden}>Show Result Details</button>
      <br /> 
      {!this.state.isHidden && 
        <div className="resultDetails">
        <p>Result Details</p>
          <table className="table">
          <col width="100" />
          {questions.map(q => {
            return(
              <Result key={q.playerName} q={q} />
            )
          })}
          </table> 
         
          <button onClick={this.toggleHidden}>Hide Result Details</button>      
        </div> 
      }      
        <button onClick={()=>this.props.handleHome()}>Home</button>
      </div>
    );
  }
}

export default ResultsPage;