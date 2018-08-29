import tokenService from './tokenService';
import socket from './socket';
const BASE_URL = '/api/rooms/';

function createRoom() {    
  socket.emit('create-room')
}

function getRoom() {
  return fetch(`${BASE_URL}active`, getAuthRequestOptions('GET'))
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error getting room');
  })
  .then(room => room);
}

function joinRoom(roomId) {
  socket.emit('join-room', roomId)
}

function startGame() {
  return fetch(`${BASE_URL}game`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + tokenService.getToken()}),
    body: JSON.stringify()
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error starting Game');
  })
}



function updateGame() {
  //update status
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
    getRoom,
    joinRoom,
    startGame
};