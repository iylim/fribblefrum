import React, { Component } from 'react';
import roomsAPI from '../../utils/roomsAPI';
import Voting from '../../components/Voting/Voting';

class VotingPage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
        question: props.room.questions[0],
        player: props.room.players.find(p => p.userId === props.user._id),
        prompt1: null,
        prompt2: null
        })
    }
 
      submitVotes = () => {
        roomsAPI.getVotes(this.state);
      } 

    render() {

      return (
        <div className="VotingPage">
        <h1>Voting Page</h1>
        {this.props.room.questions.map((q, i) => {
            return(
                <Voting key={i} q={q} fuser={this.props.user} room={this.props.room} player={this.state.player} submitVotes={this.submitVotes}/>
            )
        })}

    </div>
    )}
}

export default VotingPage;