import tokenService from './tokenService';
const BASE_URL = '/api/rooms/';

function createRoom() {    
return fetch( BASE_URL + ':id', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify()
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Bad credentials');
  })
  .then(rooms => rooms);
}

function getRoomId() {
  return fetch(BASE_URL, getAuthRequestOptions('GET'))
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Bad credentials');
  })
  .then(rooms => rooms);
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
    getRoomId
};