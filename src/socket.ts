import io from "socket.io-client";

const URL = "https://muliplayer-chess-app.herokuapp.com/";

const socket = io(URL);

// register preliminary event listeners here:

socket.on("createNewGame", (gameid: string) => {
    console.log("A new game has been created! , Game id: " + gameid);
});
//console.log("socket made");

export { socket };
