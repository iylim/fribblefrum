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
import Profile from '../../components/Profile/Profile';
import socket, { register } from '../../utils/socket';
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null, gamesPlayed: 0, wins: 0, room: null}
    register(this);
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
    this.setState({user: userService.getUser()}, function() {
      roomsAPI.getRoom()
      .then(room => {
        console.log(room)
          this.setState({room});
      });
    });
  }

  /*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    let user = userService.getUser();
    if (user) {
      this.setState({user}, function() {
        roomsAPI.getRoom()
        .then(room => {
          socket.emit('register', {user: this.state.user, room});
          this.setState({room: room});
        });
      });
    }
  }

  render() {
    var curRoom;
    curRoom = this.state.room && this.state.room.status === 'playing' && <GamePage user={this.state.user} room={this.state.room}/>;
    curRoom = curRoom || this.state.room && this.state.room.status === 'waiting' && <WaitingPage user={this.state.user} room={this.state.room}/>;
    return (
      <div className="App">
        {curRoom ?
          curRoom
        :
          <Switch>
            <Route exact path="/" render={(props) => (this.state.user ? 
            <DashboardPage {...props} user={this.state.user} handleLogout={this.handleLogout} room={this.state.room}/> : 
            <Splash {...props} /> )} />
            <Route path="/login" render={(props) => <LoginForm {...props} handleLogin={this.handleLogin} />} />
            <Route path="/signup" render={(props) => <SignupForm {...props} handleSignup={this.handleSignup} />} />
            <Route path="/joinroom" render={(props) => <JoinRoom {...props} user={this.state.user} room={this.state.room}/> } />
            <Route path="/profile" render={(props) => <Profile {...props} user={this.state.user} gamesPlayed={this.state.gamesPlayed} wins={this.state.wins}/>} />
          </Switch>
        }
      </div>
    );
  }
}

export default App;
