import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';


class Results extends Component {  
    
    render() {    
    return (
      <div className='Results'>
      <table>
          <thead>
          <tr>
              <td>Name</td>
              <td>Total Votes</td>
          </tr>
          </thead>
          <tbody>
      {this.props.room.players.forEach(p => {
          var votes = 0;
        votes = votes + p.prompts[0].votes + p.prompts[1].votes;
        return(
            <tr>
                <td>{p.name}</td>
                <td>{votes}</td>
            </tr>
        )  
    })}
    </tbody>
     </table>
      </div>
    );
  }
}

export default Results;