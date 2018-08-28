import client from 'socket.io-client';
const socket = client();
var App, history;

socket.on('update-room', function(room) {
    App.setState({room: room});
});

export function register(app, hist) {
    App = app;
    history = hist;
};

export default socket;