import React, {Component} from 'react';
import questionsAPI from '../../utils/questionsAPI';
import {Link} from 'react-router-dom';
import GameRoom from '../../components/GameRoom/GameRoom';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    questionsAPI.index().then(questions =>
    	this.setState({questions})
    );
  }

  render() {
    return (
      <div className='GamePage'>
        <header className="header-footer">Game Room #</header>
        <Link to='/'>RETURN</Link><br />
        <GameRoom questions={this.state.questions}/>
      </div>
    );
  }
}

export default GamePage;