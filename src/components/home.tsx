import React, { FormEvent, Fragment } from "react";
import { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { socket } from "../socket";
import { v4 as uuidv4 } from "uuid";

interface Props {
    setUser: (name: string) => void;
    oncreategame: () => void;
}

const Home: React.FC<Props> = (props: Props) => {
    const [inputname, setInputname] = useState("");
    const [gotname, setGotname] = useState(false);
    const gameid = useRef(uuidv4()); // generate unique room id

    const updateName = (e: FormEvent<HTMLInputElement>) => {
        setInputname(e.currentTarget.value);
    };
    const send = () => {
        // emit event to server to make a new room with the game id
        socket.emit("createNewGame", gameid.current.toString()); // create a new game with the given game id
    };
    const handleClick = () => {
        props.setUser(inputname);
        props.oncreategame();
        setGotname(true);
        send();
    };
    return (
        <Fragment>
            {gotname ? (
                <Redirect to={"/game/" + gameid.current}></Redirect> // redirect to the game page when user inputs name
            ) : (
                <div>
                    <h1>Your Name:</h1>
                    <input onInput={updateName} />
                    <button disabled={!(inputname.length > 0)} onClick={handleClick}>
                        Submit
                    </button>
                </div>
            )}
        </Fragment>
    );
};

export default Home;
