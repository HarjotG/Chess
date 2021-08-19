import io from 'socket.io-client';

const URL = 'http://localhost:5000';

const socket = io(URL);

// register preliminary event listeners here:

socket.on('createNewGame', (gameid: string) => {
  console.log('A new game has been created! , Game id: ' + gameid);
});
//console.log("socket made");

export { socket };
