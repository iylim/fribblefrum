import React, {Component} from 'react';
import questionsAPI from '../../utils/questionsAPI';
import {Link} from 'react-router-dom';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import QuestionAnswer from '../../components/QuestionAnswer/QuestionAnswer';

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
      <div className='QuestionForm'>
        <header className="header-footer">Top Scores</header>
        <Link to='/'>RETURN</Link><br />
        <QuestionForm questions={this.state.questions} />
        <QuestionAnswer questions={this.state.questions} />
      </div>
    );
  }
}

export default GamePage;