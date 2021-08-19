import React, { useEffect, useRef, useState } from "react";
import { Chess } from "chess.ts";
import { Stage, Layer, Image } from "react-konva";
import Piece from "./piece";
import { KonvaEventObject } from "konva/lib/Node";
import { socket } from "../socket";
import { useParams } from "react-router-dom";

interface Props {
    game: Chess;
    turn: string;
    playerColor: "white" | "black";
    updateTurn: () => void;
}
const Board: React.FC<Props> = (props: Props) => {
    const { gameid } = useParams<{ gameid: string }>();
    const { game, turn, updateTurn } = props;
    const selPos = useRef([0, 0]);

    // for handling the other player moving
    useEffect(() => {
        socket.on("otherMoved", (move: { from: string; to: string; promotion: string }) => {
            if (props.playerColor !== turn) {
                if (game.move({ from: move.from, to: move.to, promotion: "q" }) !== null) {
                    updateTurn();
                }
            }
        });
    });

    const handleDragStart = (e: KonvaEventObject<MouseEvent>) => {
        selPos.current = [e.target.x(), e.target.y()];
    };

    const handleDragEnd = (e: KonvaEventObject<MouseEvent>) => {
        let movetopos = getcoord(e.target.x(), e.target.y());
        let movefrompos = getcoord(selPos.current[0], selPos.current[1]);
        if (movePiece(movefrompos, movetopos)) {
            updateTurn();
        } else {
            e.target.position({ x: selPos.current[0], y: selPos.current[1] }); // reset piece to the position it was at before
        }
    };

    const movePiece = (moveFrom: string, moveTo: string): boolean => {
        if (turn !== props.playerColor) return false; // dont move unless it is the players turn to move
        let movelist = game.moves({ square: moveFrom });
        // check for castle. Only caste if trying to move king to either g1, or c1, or g8 or c8
        if (movelist.includes("O-O") && (moveTo === "g1" || moveTo === "g8")) {
            // always promote to queen
            game.move({ from: moveFrom, to: moveTo, promotion: "q" });
            // tell the other player our move
            socket.emit("playerMoved", {
                gameid: gameid,
                from: moveFrom,
                to: moveTo,
                promotion: "q",
            });
            return true;
        }
        if (movelist.includes("O-O-O") && (moveTo === "c1" || moveTo === "c8")) {
            // always promote to queen
            game.move({ from: moveFrom, to: moveTo, promotion: "q" });
            // tell the other player our move
            socket.emit("playerMoved", {
                gameid: gameid,
                from: moveFrom,
                to: moveTo,
                promotion: "q",
            });
            return true;
        }
        for (let i = 0; i < movelist.length; i++) {
            if (movelist[i].includes(moveTo)) {
                // always promote to queen
                game.move({ from: moveFrom, to: moveTo, promotion: "q" });
                // tell the other player our move
                socket.emit("playerMoved", {
                    gameid: gameid,
                    from: moveFrom,
                    to: moveTo,
                    promotion: "q",
                });
                return true;
            }
        }
        return false; // move is not in the valid list of moves
    };

    // for debugging
    // const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    //     getcoord(e.target.x(), e.target.y());
    // };

    // the chess board
    let r = 0; // to keep track of positions of peices
    let c = 0;
    return (
        <div className="Board">
            <Stage width={720} height={720}>
                <Layer>
                    {game.board().map((row) => {
                        r++;
                        c = 0;
                        return (
                            <React.Fragment key={r}>
                                {row.map((sq) => {
                                    c++;
                                    if (sq) {
                                        return (
                                            <Piece
                                                x={calcPos(c, r)[0]} // calculate the position of the peices
                                                y={calcPos(c, r)[1]}
                                                color={sq.color}
                                                type={sq.type}
                                                handleDragStart={handleDragStart}
                                                handleDragEnd={handleDragEnd}
                                                key={r * c + c + sq.color + sq.type}
                                            />
                                        );
                                    }
                                    return;
                                })}
                            </React.Fragment>
                        );
                    })}
                </Layer>
            </Stage>
        </div>
    );
};

const calcPos = (col: number, row: number): [number, number] => {
    return [((col - 1) * 660) / 8 + 30, ((row - 1) * 660) / 8 + 30];
};

const getcoord = (x: number, y: number): string => {
    // the two axis
    const horiz = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const vert = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse();
    const col = Math.floor((x * 8) / 660);
    const row = Math.floor((y * 8) / 660);
    return horiz[col] + vert[row];
};

const drawMoves = (canvas: HTMLCanvasElement, moves: [number, number][]) => {};

export default Board;
