import client from 'socket.io-client';
const socket = client();
var App;

socket.on('update-room', function(room) {
    App.setState({room: room});
});

export function register(app) {
    App = app;
};

export default socket;