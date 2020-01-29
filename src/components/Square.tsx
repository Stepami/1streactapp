import * as React from 'react';
import { FunctionComponent } from 'react';
import '../styles/square.css';

export interface ISquareProps {
    value: string,
    onClick: () => void
}

const Square: FunctionComponent<ISquareProps> = (props: ISquareProps) =>
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>;

export default Square;