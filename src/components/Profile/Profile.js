import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Profile extends Component {

    render() {
      return (
        <div className="Profile">
            <div className="Profile-username">{this.props.user.name}</div>
            <div className="user-stats"> 
            Games Played: {this.props.gamesPlayed}<br />
            Wins: {this.props.wins}
            </div>
        </div>
    )}
}

export default Profile;