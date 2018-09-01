import React from 'react';

const GameInstruction = props => (
<div>
<button onClick={props.toggleHidden}>X</button>
  <h3>Instructions</h3>
   <p> Its a battle of wits. <br /> Try to best your opponent! <br /> Your fellow players will determine the winner.</p>
 </div>
)



export default GameInstruction;