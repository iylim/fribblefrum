import tokenService from './tokenService';
import socket from './socket';
const BASE_URL = '/api/rooms/';

function createRoom() {    
  socket.emit('create-room')
}

function joinRoom(roomId) {
  socket.emit('join-room', roomId)
}

function getRoom() {
  return fetch(`${BASE_URL}active`, getAuthRequestOptions('GET'))
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error Getting Room');
  })
  .then(room => room);
}

function startGame() {
  return fetch(`${BASE_URL}play`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + tokenService.getToken()}),
    body: JSON.stringify()
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error Starting Game');
  })
}

function submitAnswer(answers) {
  return fetch(`${BASE_URL}game`, {
    method: 'PUT',
    headers: new Headers({'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + tokenService.getToken()}),
    body: JSON.stringify(answers)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error Submitting Answers');
  })
}

function getVotes(votes) {
  return fetch(`${BASE_URL}votes`, {
    method: 'PUT',
    headers: new Headers({'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + tokenService.getToken()}),
    body: JSON.stringify(votes)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error Updating');
  })
}

function playAgain() {
  return fetch(`${BASE_URL}playAgain`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + tokenService.getToken()}),
    body: JSON.stringify()
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error Starting Game');
  })
}



/*----- Helper Functions -----*/

function getAuthRequestOptions(method) {
  return {
    method: method,
    headers: new Headers({'Authorization': 'Bearer ' + tokenService.getToken()})
  };
}

export default {
    createRoom,
    joinRoom,
    getRoom,
    startGame,
    submitAnswer,
    getVotes,
    playAgain
};