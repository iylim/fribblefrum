import React, {Component} from 'react';
import questionsAPI from '../../utils/questionsAPI';
import {Link} from 'react-router-dom';
import GameRoom from '../../components/GameRoom/GameRoom';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    // questionsAPI.index().then(questions =>
    // 	this.setState({questions})
    // );
  }

  render() {
    return (
      <div className='GamePage'>
        <GameRoom questions={this.state.questions} room={this.props.room}/>
      </div>
    );
  }
}

export default GamePage;