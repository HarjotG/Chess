import React from "react";
import { Chess } from "chess.ts";

interface Props {
    game: Chess;
}
type move = {
    moveNum: number;
    moveWhite: string;
    moveBlack?: string;
};
interface PropsMove {
    move: move;
}
const MoveItem: React.FC<PropsMove> = (props: PropsMove) => {
    const { move } = props;
    return (
        <div className="Move">
            {move.moveNum + "."}
            <div className="whitemove">{move.moveWhite}</div>
            <div className="blackmove">{move.moveBlack}</div>
        </div>
    );
};

const MoveList: React.FC<Props> = (props: Props) => {
    const { game } = props;
    const moveslst = game.history();
    const moves: move[] = [];
    // grouping white and black moves together
    for (let i = 0; i < moveslst.length; i += 2) {
        if (i + 1 < moveslst.length) {
            // there is a black move
            moves.push({
                moveNum: Math.round(i / 2 + 1),
                moveWhite: moveslst[i],
                moveBlack: moveslst[i + 1],
            });
        } else {
            // there is no black move yet
            moves.push({
                moveNum: Math.round(i / 2 + 1),
                moveWhite: moveslst[i],
                moveBlack: moveslst[i + 1],
            });
        }
    }
    return (
        <div className="MoveList">
            {moves.map((move) => {
                return (
                    <MoveItem key={move.moveNum + move.moveWhite + move.moveBlack} move={move} />
                );
            })}
        </div>
    );
};

export default MoveList;
