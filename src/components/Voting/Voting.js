import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';

class Voting extends Component {  

render() { 
    return (
      <div className='Voting'>
{this.props.room.players.forEach(p => p.prompts)}
  <h3>{this.props.q}</h3>
<button disabled={ this.props.player.prompts[0].question === this.props.q || this.props.player.prompts[1].question === this.props.q } onClick={(e) => this.props.submitVote(e)}> answer1 </button>
      &nbsp;&nbsp;&nbsp;&nbsp;
<button disabled={ this.props.player.prompts[1].question === this.props.q || this.props.player.prompts[0].question === this.props.q  } onClick={(e) => this.props.submitVote(e)}> answer2 </button>
      </div>
    );
  }
}

export default Voting;