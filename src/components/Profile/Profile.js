import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Profile extends Component {

    render() {
      return (
        <div className="Profile">
            <div className="Profile-username">{this.props.user.name}</div>
            <div className="user-stats"> 
            Games Played: {this.props.user.gamesPlayed}<br />
            Wins: {this.props.user.wins}
            </div>
            <Link to='/'>Back</Link>
        </div>
    )}
}

export default Profile;