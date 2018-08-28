import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import roomsAPI from '../../utils/roomsAPI';

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null
    }
  }

handleChange = (e) => {
  var roomId = e.target.value;
  console.log(e.target.value);
  
  this.setState({room:roomId})
}

handleSubmit = (e) => {
  e.preventDefault();
  roomsAPI.joinRoom(this.state.room)
  .then(room => {
      this.setState({room});
      this.props.history.push(`/waiting/${room._id}`);
  });
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
              <button className="btn btn-default">Join Room</button>&nbsp;&nbsp;&nbsp;
              <Link to='/dashboard'>Back</Link>
            </div>
          </div>
        </form>
        </div>
    )
}

}

export default JoinRoom;