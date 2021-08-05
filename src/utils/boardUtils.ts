import { Peice } from "../App";

// get a list of moves the specified peice can make. The list of moves start from [1, 1] where the left white rook sits [horizontal, vertical]
export const getMoves = (peiceMove: Peice, peices: Peice[]): [number, number][] => {
    let moves: [number, number][] = []; // array of moves that the specified peice can make
    let x = peiceMove.position[0];
    let y = peiceMove.position[1];
    switch (peiceMove.name) {
        case "pawn_w":
            // check if able to move 1 space
            if (peices.filter((p) => p.position[0] === x && p.position[1] === y + 1).length === 0) {
                moves.push([x, y + 1]);
                // check if can move 2 spaces
                if (
                    y === 2 &&
                    peices.filter((p) => p.position[0] === x && p.position[1] === y + 2).length ===
                        0
                ) {
                    moves.push([x, y + 2]);
                }
            }
            // check if any peices can be taken
            let peice_take = peices.filter(
                (p) =>
                    p.name.includes("_b") &&
                    (p.position === [x + 1, y + 1] || p.position === [x - 1, y + 1])
            );
            peice_take.forEach((p) => {
                moves.push(p.position);
            });
            // check if any moves puts player in check
            break;
        case "pawn_b":
            break;
        case "rook_w":
            break;
        case "rook_b":
            break;
        case "knight_w":
            break;
        case "knight_b":
            break;
        case "bishop_w":
            break;
        case "bishop_b":
            break;
        case "queen_w":
            break;
        case "queen_b":
            break;
        case "king_w":
            break;
        case "king_b":
            break;
        default:
            break;
    }

    return moves;
};
