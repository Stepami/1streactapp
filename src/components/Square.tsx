import React, { FunctionComponent } from 'react';
import '../styles/square.css';

interface ISquareProps {
    value: string,
    onClick: () => void
}

export const Square: FunctionComponent<ISquareProps> = (props: ISquareProps) =>
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>;