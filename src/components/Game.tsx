import React, { Component } from 'react';
import Board from './Board';
import '../styles/game.css';

type IGameProps = {}

type IGameState = {}

export default class Game extends Component<IGameProps, IGameState> {
    render(): JSX.Element {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}