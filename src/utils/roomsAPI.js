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
  return fetch(`${BASE_URL}play`, getAuthRequestOptions('POST'))
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

function vote(promptId) {
  return fetch(`${BASE_URL}vote/${promptId}`, getAuthRequestOptions('POST'))
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error Updating');
  })
}

function done() {
  return fetch(`${BASE_URL}done`, {
    method: 'PUT',
    headers: new Headers({'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + tokenService.getToken()}),
    body: JSON.stringify()
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error Starting Again');
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
    vote,
    done
};