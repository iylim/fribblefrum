import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '',
      players: []
    }
  };

render() {
    return(
        <div className="CreateRoom">
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="roomId" className="form-control" placeholder="Room Id" value={this.state.roomId} onChange={(e) => this.handleChange('roomId', e)} />
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