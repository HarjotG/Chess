import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ChessGame from "./components/chessGame";
import PlayerCard from "./components/playerCard";
import Home from "./components/home";
import WaitOpp from "./components/waitOpp";
import JoinGame from "./components/joinGame";

const App: React.FC = () => {
    const [username, setUsername] = useState("");
    const [oppname, setOppname] = useState("");
    const [oppjoin, setOppJoin] = useState(false);
    const [createdGame, setCreatedGame] = useState(false);

    const setUser = (name: string) => {
        setUsername(name);
    };

    const handleOppJoin = (oppName: string) => {
        setOppJoin(true);
        setOppname(oppName);
    };

    const onOppJoin = () => {
        setOppJoin(true);
    };

    const handlecreategame = () => {
        setCreatedGame(true);
    };

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home setUser={setUser} oncreategame={handlecreategame} />
                    </Route>
                    <Route path="/game/:gameid" exact>
                        {oppjoin ? (
                            <div className="main">
                                <ChessGame playerColor={createdGame ? "white" : "black"} />
                                <div className="playerCards">
                                    <div className={"oppPlayer"}>
                                        <PlayerCard playerName={createdGame ? oppname : username} />
                                    </div>
                                    <div className={"currPlayer"}>
                                        <PlayerCard playerName={createdGame ? username : oppname} />
                                    </div>
                                </div>
                            </div>
                        ) : createdGame ? (
                            <WaitOpp onOppJoin={handleOppJoin} playername={username} /> // wait for opponent to join if user created the game
                        ) : (
                            <JoinGame setUser={setUser} onOppJoin={handleOppJoin} /> // otherwise, the user was invited by link and needs to input their name
                        )}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
