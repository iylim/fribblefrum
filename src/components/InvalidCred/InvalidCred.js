import React, { Component } from 'react';

const InvalidCred = props => {
  return(
    <div className="InvalidModal">
      <h4>Invalid Email and/or Password.</h4>
      <button onClick={props.toggleHidden}>ok</button>
      </div>
  )
}
export default InvalidCred;