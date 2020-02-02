import React, { FunctionComponent } from 'react';
import '../styles/square.css';

interface ISquareProps {
    value: string,
    onClick: () => void,
    won: boolean
}

export const Square: FunctionComponent<ISquareProps> = (props: ISquareProps) =>
    <button style={{ background: props.won ? "green" : "white" }} className="square" onClick={props.onClick}>
        {props.value}
    </button>;