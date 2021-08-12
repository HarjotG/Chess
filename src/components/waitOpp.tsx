import React from "react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";

interface Props {
    playername: string;
    onOppJoin: (oppName: string) => void;
}

const WaitOpp: React.FC<Props> = (props: Props) => {
    const { gameid } = useParams<{ gameid: string }>();
    // register event listeners for when
    useEffect(() => {
        socket.on("playerJoined", (name: string) => {
            props.onOppJoin(name);
            // give the name to other player
            socket.emit("giveName", { gameid: gameid, name: props.playername });
        });
    }, []);
    //console.log(socket.listeners("playerJoined"));
    return (
        <div>
            <h1>Waiting for opponent to join game...</h1>
            <h2>Send this link to your friend:</h2>
            <textarea value={"http://localhost:3000/game/" + gameid} readOnly></textarea>
        </div>
    );
};

export default WaitOpp;
