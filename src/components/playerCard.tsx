import React from "react";

interface Props {
    playerName: string;
}
const PlayerCard: React.FC<Props> = (props: Props) => {
    return <div className="playercard">{props.playerName}</div>;
};

export default PlayerCard;
