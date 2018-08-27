import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import Splash from '../Splash/Splash';
import GamePage from '../GamePage/GamePage';
import DashboardPage from '../DashboardPage/DashboardPage';
import userService from '../../utils/userService';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';

class App extends Component {
  constructor() {
    super();
    this.state = { user: '', gamesPlayed: 0, wins: 0}
  }


  /*---------- Helper Methods ----------*/


  /*---------- Callback Methods ----------*/

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  handleSignup = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogin = () => {
    this.setState({user: userService.getUser()});
  }

  /*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
          <Route exact path="/" render={(props) => <Splash  />} />
          <Route path="/login" render={() => <LoginForm handleLogin={this.handleLogin} />} />
          <Route path="/signup" render={() => <SignupForm handleSignup={this.handleSignup} />} />
          <Route path="/dashboard" render={(props) => <DashboardPage /> } />
          <Route path="/game/:id" render={(props) => <GamePage {...props}/> } />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
