import React, { Component } from 'react';

const TopScore = props => {
  return(
    <div>
      <div id={props.obj.player}> {props.obj.player} ******** Votes: {props.obj.votes} </div>
      </div>
  )
}
export default TopScore;