import React from 'react';
import useImage from 'use-image';
import { Image } from 'react-konva';
import { PieceSymbol } from 'chess.ts';
import { KonvaEventObject } from 'konva/lib/Node';

interface Props {
  x: number;
  y: number;
  color: 'w' | 'b';
  type: PieceSymbol;
  handleDragStart: (e: KonvaEventObject<MouseEvent>) => void;
  handleDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
}

const Piece = (props: Props) => {
  const { x, y, color, type, handleDragStart, handleDragEnd } = props;
  let image_b, image_w, img;
  [image_w] = useImage(pieceImgs[type][0]);
  [image_b] = useImage(pieceImgs[type][1]);
  if (color === 'w') {
    img = image_w;
  } else {
    img = image_b;
  }
  return (
    <Image
      x={x}
      y={y}
      image={img}
      draggable
      onDragstart={handleDragStart}
      onDragEnd={handleDragEnd}
      width={75}
      height={75}
    />
  );
};

const pieceImgs = {
  p: [
    'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
  ],
  n: [
    'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
    'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
  ],
  b: [
    'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
  ],
  r: [
    'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
    'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
  ],
  q: [
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
  ],
  k: [
    'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
  ],
};

export default Piece;
