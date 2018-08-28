import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './DashboardPage.css';
import roomsAPI from '../../utils/roomsAPI';

class Dashboard extends Component {

    createRoom() {
        roomsAPI.createRoom();
    }

    render() {
      return (
        <div className="Dashboard">
            <div className="username">{this.props.user.name}</div>
            <div className="options">
                <button to="" onClick={this.createRoom}>Create Room</button><br />
                <Link to="/joinroom"> Join Room </Link><br />
                <Link to="/profile">My Profile</Link><br />
                <Link to="" onClick={this.props.handleLogout}>Logout</Link>
            </div>
        </div>
    )}
}

export default Dashboard;