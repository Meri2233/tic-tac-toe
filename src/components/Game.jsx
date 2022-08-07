import Board from "./Board"
import { useState } from "react";

let startingBoard = new Array(3).fill(0).map((el) => new Array(3).fill(" "))
let move = 0;

function Game() {
    let [curBoard, setCurrBoard] = useState(startingBoard);
    let [isXplaying, setIsXPlaying] = useState(true);
    let dummyBoard = JSON.parse(JSON.stringify(curBoard));
    let [history, setHistory] = useState([[]]);
    let board = {};

    let hasXwon = () => {
        let horizontal1 = (dummyBoard[0][0] === 'X' && dummyBoard[0][1] === 'X' && dummyBoard[0][2] === 'X');
        let horizontal2 = (dummyBoard[1][0] === 'X' && dummyBoard[1][1] === 'X' & dummyBoard[1][2] === 'X');
        let horizontal3 = (dummyBoard[2][0] === 'X' && dummyBoard[2][1] === 'X' & dummyBoard[2][2] === 'X');
        let vertical1 = (dummyBoard[0][0] === 'X' && dummyBoard[1][0] === 'X' && dummyBoard[2][0] === 'X');
        let vertical2 = (dummyBoard[0][1] === 'X' && dummyBoard[1][1] === 'X' && dummyBoard[2][1] === 'X');
        let vertical3 = (dummyBoard[0][2] === 'X' && dummyBoard[1][2] === 'X' && dummyBoard[2][2] === 'X');
        let diagnol1 = (dummyBoard[0][0] === 'X' && dummyBoard[1][1] === 'X' && dummyBoard[2][2] === 'X');
        let diagnol2 = (dummyBoard[0][2] === 'X' && dummyBoard[1][1] === 'X' && dummyBoard[2][0] === 'X');
        return (horizontal1 || horizontal2 || horizontal3 || vertical1 || vertical2 || vertical3 || diagnol1 || diagnol2);
    }

    let hasYwon = () => {
        let horizontal11 = (dummyBoard[0][0] === 'O' && dummyBoard[0][1] === 'O' && dummyBoard[0][2] === 'O');
        let horizontal22 = (dummyBoard[1][0] === 'O' && dummyBoard[1][1] === 'O' & dummyBoard[1][2] === 'O');
        let horizontal33 = (dummyBoard[2][0] === 'O' && dummyBoard[2][1] === 'O' & dummyBoard[2][2] === 'O');
        let vertical11 = (dummyBoard[0][0] === 'O' && dummyBoard[1][0] === 'O' && dummyBoard[2][0] === 'O');
        let vertical22 = (dummyBoard[0][1] === 'O' && dummyBoard[1][1] === 'O' && dummyBoard[2][1] === 'O');
        let vertical33 = (dummyBoard[0][2] === 'O' && dummyBoard[1][2] === 'O' && dummyBoard[2][2] === 'O');
        let diagnol11 = (dummyBoard[0][0] === 'O' && dummyBoard[1][1] === 'O' && dummyBoard[2][2] === 'O');
        let diagnol22 = (dummyBoard[0][2] === 'O' && dummyBoard[1][1] === 'O' && dummyBoard[2][0] === 'O');
        return (horizontal11 || horizontal22 || horizontal33 || vertical11 || vertical22 || vertical33 || diagnol11 || diagnol22);
    }

    let isGameInProgress = () => {
        for (let i = 0; i < dummyBoard.length; i++) {
            for (let j = 0; j < dummyBoard[i].length; j++) {
                if (dummyBoard[i][j] === " ") {
                    return true;
                }
            }
        }
        return false;
    }

    let handleClick = (event, row, col) => {
            dummyBoard[row][col] = isXplaying ? "X" : "O";
            let movesEl = document.querySelector(".moves");

            setCurrBoard(dummyBoard);
            setIsXPlaying(!isXplaying);

            let newMessage = document.querySelector(".status");

            if (hasXwon()) {
                newMessage.innerHTML = "<b>X has won</b>";
                move = 0;
                setTimeout(() => {
                    setCurrBoard(startingBoard);
                    newMessage.innerHTML = "<b>Game in Progress</b>"
                    movesEl.innerHTML = "";

                }, 500);
            }

            else if (hasYwon()) {
                newMessage.innerHTML = "<b>O has won</b>";
                move = 0;
                setTimeout(() => {
                    setCurrBoard(startingBoard);
                    newMessage.innerHTML = "<b>Game in Progress</b>"
                    movesEl.innerHTML = "";

                }, 500);
            }

            else if (isGameInProgress()) {
                move++;
                storeMoves(dummyBoard, move);
            }

            else {
                newMessage.innerHTML = "<b>Game is drawn</b>";
                move = 0;
                setTimeout(() => {
                    setCurrBoard(startingBoard);
                    newMessage.innerHTML = "<b>Game in Progress</b>"
                    movesEl.innerHTML = "";
                }, 500);
            }
    }

    let goToMove = (event) => {
        let chosenMove = event.target.innerText;
        setCurrBoard(board[chosenMove]);
    }

    let storeMoves = (dummyBoard, move) => {
        let movesEl = document.querySelector(".moves");
        let m = document.createElement("button");
        let text = "Move" + move
        m.innerText = text;
        m.onclick = goToMove;
        board[m.innerText] = dummyBoard;
        movesEl.appendChild(m);
        m.classList.add(text);
    }

    return (
        <div className="game-container">
            <div className="gamearea">
                <h1>Tic-Tac-Toe</h1>
                <p><b>Current Player: {isXplaying ? "X" : "O"}</b></p>
                <Board curBoard={curBoard} handleClick={handleClick} />
                <p className="status"><b>Game in Progress</b></p>
            </div>

            <div className="gamehistory">
                <h2>Game History</h2>
                <div className="moves">
                </div>
            </div>
        </div>
    )
}

export default Game