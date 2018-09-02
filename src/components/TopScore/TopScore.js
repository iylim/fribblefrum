import React, { Component } from 'react';

const TopScore = props => {
  return(
    <div>
      <div id={props.obj.player}>Player: {props.obj.player} &nbsp;&nbsp; Total: {props.obj.votes} </div>
      </div>
  )
}
export default TopScore;