import React from "react";
import { useState } from "react";
import ChessGame from "./components/chessGame";
import PlayerCard from "./components/playerCard";

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="main">
                <ChessGame />
                <div className="playerCards">
                    <div className="oppPlayer">
                        <PlayerCard playerName={"Opponent"} />
                    </div>
                    <div className="currPlayer">
                        <PlayerCard playerName={"You"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
