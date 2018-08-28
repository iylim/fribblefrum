import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import Splash from '../Splash/Splash';
import GamePage from '../GamePage/GamePage';
import DashboardPage from '../DashboardPage/DashboardPage';
import WaitingPage from '../WaitingPage/WaitingPage';
import userService from '../../utils/userService';
import roomsAPI from '../../utils/roomsAPI';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';
import JoinRoom from '../../components/JoinRoom/JoinRoom';

class App extends Component {
  constructor() {
    super();
    this.state = {user: {}, gamesPlayed: 0, wins: 0, rooms:[]}
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

  createRoom = () => {
    roomsAPI.createRoom().then(room => {
      this.setState({room});
      this.props.history.push(`/waiting/${room._id}`);
    })
  }
    //get back room document (._id, roomId, players: [player name, player name ])
    //history.push(`/rooms/${room._id`)

    //socket io listening for start game
    //game id and room can be same id for route
    
  

  /*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={(props) => (this.state.user ? <DashboardPage {...props} user={this.state.user} handleLogout={this.handleLogout} createRoom={this.createRoom}/> : <Splash {...props} />)} />
          <Route path="/login" render={(props) => <LoginForm {...props} handleLogin={this.handleLogin} />} />
          <Route path="/signup" render={(props) => <SignupForm name={this.state.name} {...props} handleSignup={this.handleSignup} />} />
          <Route path="/dashboard" render={(props) => <DashboardPage {...props} user={this.state.user} handleLogout={this.handleLogout} createRoom={this.createRoom}/> } />
          <Route path="/joinroom" render={(props) => <JoinRoom {...props} user={this.state.user}/> } />
          <Route path="/waiting/:id" render={(props) => <WaitingPage {...props} user={this.state.user} rooms={this.state.rooms}/>} />
          <Route path="/game/:id" render={(props) => <GamePage {...props}/> } />
        </Switch>
      </div>
    );
  }
}

export default App;
