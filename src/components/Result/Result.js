import React, { Component } from 'react';

const Result = props => {
  return(
    <div>
      <thead >
      <tr><td colSpan="2">{props.q.question}</td></tr>
      </thead>
      <tbody>
            <tr className="answer-row">
              <td>{props.q.answers[0].answer}</td> 
              <td>{props.q.answers[1].answer}</td>
            </tr>
            <tr>
              <td >{props.q.answers[0].playerName}<br /> Votes: {props.q.answers[0].votes} </td> 
              <td>{props.q.answers[1].playerName} <br /> Votes: {props.q.answers[1].votes}</td>
            </tr>
      </tbody>
      </div>
  )
}
export default Result;