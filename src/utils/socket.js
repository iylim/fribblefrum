import client from 'socket.io-client';
const socket = client();

socket.on('update-game', function(game) {
    console.log('update-game message recieved');
});

export default socket;