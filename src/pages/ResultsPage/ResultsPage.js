import React, {Component} from 'react';
import roomsAPI from '../../utils/roomsAPI';
import { Link } from 'react-router-dom';
class ResultsPage extends Component {  
    
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
     <button>Play Again</button>
     <Link to="/">Home</Link>
      </div>
    );
  }
}

export default ResultsPage;