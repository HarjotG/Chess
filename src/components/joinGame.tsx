import React, { useState } from "react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";

interface Props {
    setUser: (name: string) => void;
    onOppJoin: (oppName: string) => void;
}

const JoinGame: React.FC<Props> = (props: Props) => {
    const [inputname, setInputname] = useState("");
    const { gameid } = useParams<{ gameid: string }>();

    const updateName = (e: FormEvent<HTMLInputElement>) => {
        setInputname(e.currentTarget.value);
    };
    const handleClick = () => {
        props.setUser(inputname);
        // listen for the other players name
        socket.on("oppName", handleOppName);
        // join the room
        socket.emit("playerJoinsGame", { gameid: gameid, name: inputname });
    };
    // update oponent name
    const handleOppName = (name: string) => {
        props.onOppJoin(name);
    };
    return (
        <div>
            <h1>Your Name:</h1>
            <input onInput={updateName} />
            <button disabled={!(inputname.length > 0)} onClick={handleClick}>
                Submit
            </button>
        </div>
    );
};

export default JoinGame;
