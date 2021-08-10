import React, { useEffect, useRef, useState } from "react";
import { Chess } from "chess.ts";
import Board from "./Board";
import MoveList from "./moveList";

//todo: make server
//      take initial player color from server
//      send player moves to server
//      play opponents moves from server

const ChessGame: React.FC = () => {
    const gameRef = useRef(new Chess());
    const [turn, setturn] = useState("white"); // to keep track of player turn
    const [update, setupdate] = useState(true); // to force update in some cases
    const game = gameRef.current;

    const handleUpdateTurn = () => {
        if (turn === "white") {
            setturn("black");
        } else {
            setturn("white");
        }
    };

    return (
        <div className="game">
            <MoveList game={game} />
            <Board game={game} turn={turn} updateTurn={handleUpdateTurn} />
        </div>
    );
};

export default ChessGame;
