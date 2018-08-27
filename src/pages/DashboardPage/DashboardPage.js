import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './DashboardPage.css';

class Dashboard extends Component {

    render() {
      return (
        <div className="Dashboard">
            <div className="username">{this.props.user.name}</div>
            <div className="options">
                <Link to="" onClick={this.props.createRoom}>Create Room </Link><br />
                <Link to="/joinroom"> Join Room </Link><br />
                My Profile<br />
                <Link to="" onClick={this.props.handleLogout}>Logout</Link>
            </div>
        </div>
    )}
}

export default Dashboard;