import React from 'react';

const GameInstruction = props => (
<div className="Instructions">
  <span>Instructions</span> &nbsp; <button onClick={props.toggleHidden}>X</button>
   <p> Its a battle of wits. <br /> Try to best your opponent! <br /> Your fellow players will determine the winner.</p>
 </div>
)



export default GameInstruction;