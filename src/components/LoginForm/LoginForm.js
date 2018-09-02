import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import InvalidCred from '../../components/InvalidCred/InvalidCred'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pw: '',
      message: '',
      isHidden: true,
    };
  }

  updateMessage = (msg) => {
    this.toggleHidden();
    this.setState({message: msg});
  }

  toggleHidden = () => {
      this.setState({isHidden: !this.state.isHidden});
  }

  handleChange = (field, e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [field]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.login(this.state)
      .then(() => {
        this.props.handleLogin();
        this.props.history.push('/');
      })
      .catch(err => this.updateMessage(err.message));
  }

  render() {
    return (
      <div className="login">
        <header className="header-footer">Log In</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={this.state.pw} onChange={(e) => this.handleChange('pw', e)} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
        {!this.state.isHidden && <InvalidCred isHidden={this.state.isHidden} toggleHidden={this.toggleHidden}/>}
        </div>
        
        
    );
  }
};

export default LoginForm;