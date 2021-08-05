import React, { useEffect, useRef, useState } from "react";
import { Peice } from "../App";
import { getMoves } from "../utils/boardUtils";
import { Chess } from "chess.ts";

interface Props {
    peices: Peice[];
    onMove: (peice: Peice, position: [number, number]) => void;
}

export const Board: React.FC<Props> = (props: Props) => {
    const { peices, onMove } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseDownFlag = useRef(false);
    const selPeice = useRef<Peice | null>(null);
    const [mpos, setmpos] = useState<[number, number]>([0, 0]);

    const getpos = (x: number, y: number): [number, number] => {
        const canvas = canvasRef.current;
        if (canvas === null) return [0, 0]; // wont happen
        const rect = canvas.getBoundingClientRect();
        const dx = rect.width / 8;
        const dy = rect.height / 8;
        const px = Math.floor((x - rect.left) / dx);
        const py = Math.floor((rect.bottom - y) / dy);
        const pos: [number, number] = [px + 1, py + 1];
        return pos;
    };
    const getPeice = (x: number, y: number): Peice => {
        const pos = getpos(x, y);
        return peices.filter((p) => p.position[0] === pos[0] && p.position[1] === pos[1])[0];
    };
    const handleMDown = (e: MouseEvent) => {
        if (!mouseDownFlag.current) {
            selPeice.current = getPeice(e.clientX, e.clientY);
            mouseDownFlag.current = true;
        }
    };
    const handleMUp = (e: MouseEvent) => {
        if (mouseDownFlag.current) {
            mouseDownFlag.current = false;
            const pos = getpos(e.clientX, e.clientY);
            if (selPeice.current !== null) onMove(selPeice.current, pos);
            selPeice.current = null;
        }
    };
    const handleMMove = (e: MouseEvent) => {
        if (mouseDownFlag.current) {
            setmpos([e.clientX, e.clientY]);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas === null) return;
        resizeCanvasToDisplaySize(canvas);
        drawbg(canvas);
        // if there is a peice selected, different drawing process so that
        // we can "pick up" and move the peice
        if (selPeice.current !== null && selPeice.current !== undefined) {
            drawMoves(canvas, getMoves(selPeice.current, peices));
            drawPeices(
                canvas,
                peices.filter((p) => p !== selPeice.current)
            );
            drawSelPeice(canvas, selPeice.current, mpos[0], mpos[1]);
        } else {
            drawPeices(canvas, peices);
        }
    }, [peices, mpos]);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas === null) return;
        canvas.addEventListener("mousedown", (e) => {
            handleMDown(e);
        });
        canvas.addEventListener("mouseup", (e) => {
            handleMUp(e);
        });
        canvas.addEventListener("mousemove", (e) => {
            handleMMove(e);
        });
    }, []);
    return <canvas className="Board" ref={canvasRef} />;
};
const drawbg = (canvas: HTMLCanvasElement) => {
    const { width, height } = canvas.getBoundingClientRect();
    const dx = width / 8;
    const dy = height / 8;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i % 2 === 0 && j % 2 === 0) {
                ctx.fillStyle = "#D4B895"; // beige
                ctx.fillRect(j * dx, i * dy, dx, dy);
            } else if (i % 2 === 0) {
                ctx.fillStyle = "#8B4513"; // brown
                ctx.fillRect(j * dx, i * dy, dx, dy);
            } else if (j % 2 === 0) {
                ctx.fillStyle = "#8B4513"; // brown
                ctx.fillRect(j * dx, i * dy, dx, dy);
            } else {
                ctx.fillStyle = "#D4B895"; // beige
                ctx.fillRect(j * dx, i * dy, dx, dy);
            }
        }
    }
};
const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }

    return false;
};
const drawSelPeice = (canvas: HTMLCanvasElement, peice: Peice, x: number, y: number) => {
    const rect = canvas.getBoundingClientRect();
    const dx = rect.width / 8;
    const dy = rect.height / 8;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;
    ctx.drawImage(peice.image, x - rect.left - dx / 2, y - dy / 2, dx, dy);
};
const drawPeices = (canvas: HTMLCanvasElement, peices: Peice[]) => {
    const { width, height } = canvas.getBoundingClientRect();
    const dx = width / 8;
    const dy = height / 8;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;
    for (let i = 0; i < peices.length; i++) {
        const peice = peices[i];
        const px = peice.position[0] - 1;
        const py = 8 - peice.position[1];
        peice.image.onload = () => {
            ctx.drawImage(peice.image, px * dx, py * dy, dx, dy);
        };
        ctx.drawImage(peice.image, px * dx, py * dy, dx, dy);
    }
};
const drawMoves = (canvas: HTMLCanvasElement, moves: [number, number][]) => {
    const { width, height } = canvas.getBoundingClientRect();
    const dx = width / 8;
    const dy = height / 8;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;
    ctx.fillStyle = "#FFCD01"; // yellow
    moves.forEach((m) => {
        ctx.fillRect((m[0] - 1) * dx, (8 - m[1]) * dy, dx, dy);
    });
};
