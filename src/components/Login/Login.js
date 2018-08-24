import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return(
            <div className="Login">
                <Link to='/'>Home</Link>
            </div>
        )
    }
}

export default Login;