import React, { useEffect, useRef, useState } from "react";
import { Chess } from "chess.ts";
import Board from "./Board";
import MoveList from "./moveList";

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
