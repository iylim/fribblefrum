import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Profile extends Component {

    render() {
      return (
        <div className="Profile">
            <div className="Profile-username">Name: {this.props.user.name}<br />
            Email: {this.props.user.email}</div>
            <Link to='/'>Back</Link>
        </div>
    )}
}

export default Profile;