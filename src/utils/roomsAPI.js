import tokenService from './tokenService';
const BASE_URL = '/api/rooms/';

function createRoom() {    
return fetch( BASE_URL, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + tokenService.getToken()}),
    body: JSON.stringify()
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error creating room');
  })
  .then(room => room);
}

function getRoom(id) {
  return fetch(`${BASE_URL}${id}`, getAuthRequestOptions('GET'))
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error getting room');
  })
  .then(room => room);
}

function joinRoom(id) {
  return fetch(`${BASE_URL}${id}`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + tokenService.getToken()}),
    body: JSON.stringify()
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error joining room');
  })
  .then(room => room);
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
    joinRoom
};