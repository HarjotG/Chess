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
  p: ['Chess_plt45.svg', 'Chess_pdt45.svg'],
  n: ['Chess_nlt45.svg', 'Chess_ndt45.svg'],
  b: ['Chess_blt45.svg', 'Chess_bdt45.svg'],
  r: ['Chess_rlt45.svg', 'Chess_rdt45.svg'],
  q: ['Chess_qlt45.svg', 'Chess_qdt45.svg'],
  k: ['Chess_klt45.svg', 'Chess_kdt45.svg'],
};

export default Piece;
