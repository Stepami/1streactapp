import React, { Component } from 'react';
import { Board } from './Board';
import '../styles/game.css';

type IGameProps = {}

interface IHistory {
    squares: string[],
    clickedIndex: number
}

interface IWinInfo {
    winner: string,
    line: number[]
}

interface IGameState {
    history: IHistory[],
    stepNumber: number,
    xIsNext: boolean
}

export default class Game extends Component<IGameProps, IGameState> {
    constructor(props: IGameProps) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                clickedIndex: -1
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    handleClick(i: number): void {
        const history: IHistory[] = this.state.history.slice(0, this.state.stepNumber + 1);
        const current: IHistory = history[history.length - 1];
        const squares: string[] = current.squares.slice();
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                clickedIndex: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step: number): void {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render(): JSX.Element {
        const history: IHistory[] = this.state.history;
        const current: IHistory = history[this.state.stepNumber];
        const winInfo: IWinInfo = calculateWinner(current.squares);

        const moves: JSX.Element[] = history.map((step, move: number) => {
            const x: number = (step.clickedIndex % 3) + 1;
            const y: number = ~~(step.clickedIndex / 3) + 1;

            const desc: string = move ? 'Перейти к ходу #' + move + ' (столбец ' + x + ' ; строка ' + y + ')' : 'К началу игры';
            return (
                <li key={move}>
                    <button style={{ backgroundColor: move === this.state.stepNumber ? "red" : "white" }} onClick={() => { this.jumpTo(move) }}>
                        {desc}
                    </button>
                </li>
            );
        });

        let status: string;
        if (winInfo.winner) {
            status = 'Выиграл ' + winInfo.winner;
        } else if (this.state.stepNumber === 9) {
            status = 'Ничья';
        } else {
            status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i: number) => this.handleClick(i)}
                        winningLine={winInfo.line}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares: string[]): IWinInfo {
    const lines: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                line: lines[i]
            };
        }
    }
    return { winner: null, line: [-1, -1, -1] };
}