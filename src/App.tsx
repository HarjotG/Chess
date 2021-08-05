import React, { useEffect } from "react";
import { useState } from "react";
import { Board } from "./components/board";

export interface Peice {
    position: [number, number]; // [horizontal, vertical]. Note: [1, 1] is where the left white rook is
    name: string;
    image: HTMLImageElement;
}

const initPeices = (): Peice[] => {
    const peices: Peice[] = [];
    // set pawns
    for (let i = 1; i <= 8; i++) {
        const pawn_w_img = new Image();
        pawn_w_img.src = "./img/Chess_plt45.svg";
        const pawn_b_img = new Image();
        pawn_b_img.src = "./img/Chess_pdt45.svg";
        peices.push({ position: [i, 2], name: "pawn_w", image: pawn_w_img });
        peices.push({ position: [i, 7], name: "pawn_b", image: pawn_b_img });
    }
    // set rooks
    for (let i = 1; i <= 8; i += 7) {
        const rook_w_img = new Image();
        rook_w_img.src = "./img/Chess_rlt45.svg";
        const rook_b_img = new Image();
        rook_b_img.src = "./img/Chess_rdt45.svg";
        peices.push({ position: [i, 1], name: "rook_w", image: rook_w_img });
        peices.push({ position: [i, 8], name: "rook_b", image: rook_b_img });
    }
    // set knights
    for (let i = 2; i <= 7; i += 5) {
        const knight_w_img = new Image();
        knight_w_img.src = "./img/Chess_nlt45.svg";
        const knight_b_img = new Image();
        knight_b_img.src = "./img/Chess_ndt45.svg";
        peices.push({ position: [i, 1], name: "knight_w", image: knight_w_img });
        peices.push({ position: [i, 8], name: "knight_b", image: knight_b_img });
    }
    // set bishops
    for (let i = 3; i <= 6; i += 3) {
        const bishop_w_img = new Image();
        bishop_w_img.src = "./img/Chess_blt45.svg";
        const bishop_b_img = new Image();
        bishop_b_img.src = "./img/Chess_bdt45.svg";
        peices.push({ position: [i, 1], name: "bishop_w", image: bishop_w_img });
        peices.push({ position: [i, 8], name: "bishop_b", image: bishop_b_img });
    }

    // set queens
    const queen_w_img = new Image();
    queen_w_img.src = "./img/Chess_qlt45.svg";
    const queen_b_img = new Image();
    queen_b_img.src = "./img/Chess_qdt45.svg";
    peices.push({ position: [4, 1], name: "queen_w", image: queen_w_img });
    peices.push({ position: [4, 8], name: "queen_b", image: queen_b_img });
    // set kings
    const king_w_img = new Image();
    king_w_img.src = "./img/Chess_klt45.svg";
    const king_b_img = new Image();
    king_b_img.src = "./img/Chess_kdt45.svg";
    peices.push({ position: [5, 1], name: "king_w", image: king_w_img });
    peices.push({ position: [5, 8], name: "king_b", image: king_b_img });
    return peices;
};

const App: React.FC = () => {
    const [peices, setPeices] = useState(initPeices());
    const handleMove = (peice: Peice, position: [number, number]) => {
        const peices_cpy = peices.map((p) => {
            if (p === peice) p.position = position;
            return p;
        });
        setPeices(peices_cpy);
    };
    return (
        <div className="App">
            <Board peices={peices} onMove={handleMove} />
        </div>
    );
};

export default App;
