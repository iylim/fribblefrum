import React, { Component } from 'react';
import roomsAPI from '../../utils/roomsAPI';
import Voting from '../../components/Voting/Voting';

class VotingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    // {
    //     question: props.room.questions[0],
    //     player: props.room.players.find(p => p.userId === props.user._id),
    //     prompt1: null,
    //     prompt2: null
    // }

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
        // debugger
        var userId = this.props.user._id;
        console.log(userId, questions)
        keys.forEach(k => {
            if (questions[k].answers.some(a => a.votes.includes(userId))) delete questions[k];
        });
        keys = Object.keys(questions);
        var question = keys.length ? {
            question: keys[0],
            answers: questions[Object.keys(questions)[0]].answers
        } : null;
        console.log(question)
         return (
            <div className="VotingPage">
                {question ? 
                    <div>
                        <h3>Vote for your favorite answer</h3>

                    </div>
                :
                    <h3>Waiting for other players to finish voting!</h3>
                }
            </div>
        )
    }
}

export default VotingPage;