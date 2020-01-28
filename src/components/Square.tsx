import * as React from 'react';
import '../styles/square.css';

export interface ISquareProps {
    value: string,
    onClick: () => void
}

export const Square = (props: ISquareProps) =>
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>;