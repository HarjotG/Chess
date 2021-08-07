import React, { useEffect, useRef, useState } from "react";
import { Chess } from "chess.ts";
import { Stage, Layer, Image } from "react-konva";
import Piece from "./piece";
import { KonvaEventObject } from "konva/lib/Node";

interface Props {
    game: Chess;
    turn: string;
    updateTurn: () => void;
}
const Board: React.FC<Props> = (props: Props) => {
    const { game, turn, updateTurn } = props;
    const selPos = useRef([0, 0]);
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
        // check for checkmate, stalemate etc
        if (game.inCheckmate()) {
            console.log("Checkmate!");
        } else if (game.inDraw()) {
            console.log("Game in draw");
        } else if (game.inStalemate()) {
            console.log("Game in stalemate");
        }
    };

    const movePiece = (moveFrom: string, moveTo: string): boolean => {
        let movelist = game.moves({ square: moveFrom });
        for (let i = 0; i < movelist.length; i++) {
            if (movelist[i].includes(moveTo)) {
                // always promote to queen
                game.move({ from: moveFrom, to: moveTo, promotion: "q" });
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
