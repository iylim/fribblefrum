import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import roomsAPI from '../../utils/roomsAPI';

class JoinRoom extends Component {
  handleChange = (e) => {
    this.setState({roomId: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    roomsAPI.joinRoom(this.state.roomId);
  }

  render() {
    return(
      <div className="CreateRoom">
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="roomId" className="form-control" placeholder="Enter Room Id" onChange={(e) => this.handleChange(e)} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default" type="submit">Join Room</button>&nbsp;&nbsp;&nbsp;
              <Link to="/">Back</Link>
            </div>
          </div>
        </form>
      </div>
    )
  }

}

export default JoinRoom;