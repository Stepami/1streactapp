import React, { FunctionComponent } from 'react';
import { Square } from './Square';
import '../styles/board.css';

interface IBoardProps {
    squares: string[],
    onClick: (i: number) => void,
    winningLine: number[]
}

export const Board: FunctionComponent<IBoardProps> = (props: IBoardProps) =>
    <div>
        <div className="status">{status}</div>
        {
            [[0, 1, 2], [3, 4, 5], [6, 7, 8]].map((row: number[], _col: number) => {
                return (
                    <div className="board-row">
                        {row.map((x: number, _i: number) => {
                            return (
                                <Square
                                    value={props.squares[x]}
                                    onClick={() => props.onClick(x)}
                                    won={props.winningLine.indexOf(x) !== -1}
                                />
                            )
                        })}
                    </div>
                )
            })
        }
    </div>