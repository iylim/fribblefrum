import React, { Component } from 'react';
import roomsAPI from '../../utils/roomsAPI';

class VotingPage extends Component {
  submitVote = (promptId) => {
    roomsAPI.vote(promptId);
  };
    
    render() {
        var player = this.props.room.players.find(p => p.userId === this.props.user._id); 
        var playerQuestions = player.prompts.map(p => p.question);
        var allPrompts = this.props.room.players.map(p => p.prompts);
        var prompts = [];
        allPrompts.forEach(p => prompts.push(...p));
        var questions = prompts.reduce((acc, prompt) => {
            if (playerQuestions.includes(prompt.question)) return acc;
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
        var userId = this.props.user._id;
        keys.forEach(k => {
            if (questions[k].answers.some(a => a.votes.includes(userId))) delete questions[k];
        });
        keys = Object.keys(questions);
        var question = keys.length ? {
            question: keys[0],
            answers: questions[Object.keys(questions)[0]].answers    
        } : null;
        return (
            <div className="VotingPage">
                {question ? 
                    <div>
                        <h3>Vote for your favorite answer</h3>
                        <h2>{keys}</h2>
                       <button onClick={() => this.submitVote(questions[keys].answers[0].promptId)}>{questions[keys].answers[0].answer}</button>
                       <button onClick={() => this.submitVote(questions[keys].answers[1].promptId)}>{questions[keys].answers[1].answer}</button>
                    </div>
                :
                    <h3>Waiting for other players to finish voting!</h3>
                }
            </div>
        )
    }
}

export default VotingPage;