import React, {Component} from 'react';
import questionsAPI from '../../utils/questionsAPI';
import {Link, Switch} from 'react-router-dom';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import QuestionAnswer from '../../components/QuestionAnswer/QuestionAnswer';

class GameRoom extends Component {

  render() {
    return (
      <div className='GameRoom'>
      <Switch>
       <QuestionForm />
       <QuestionAnswer />
       </Switch>
      </div>
    );
  }
}

export default GameRoom;