import React, { Component } from 'react';

const Result = props => {
  return(
    <div>
    <span>{props.q.question}</span>
    <tbody>
      <tr>
        <td>{props.q.answers[0].answer}</td> 
        <td>{props.q.answers[1].answer}</td>
      </tr>
      <tr>
        <td>{props.q.answers[0].playerName}<br />Votes: {props.q.answers[0].votes} </td> 
        <td>{props.q.answers[1].playerName} <br />Votes: {props.q.answers[1].votes}</td>
      </tr>
    </tbody>
    </div>
  )
}
export default Result;