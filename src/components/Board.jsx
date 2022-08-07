import Square from "./Square"

function Board({handleClick,curBoard}) {
    let generateRow = (rowNum) => <div className="row"> {curBoard[rowNum].map((el, col) => <Square key={rowNum + "" + col} 
    row={rowNum} col={col} updateBoard={handleClick} value={el}/>)}</div>
    return (
        <div className="board">
            {curBoard.map((row, idx) => generateRow(idx))}
        </div>
    )
}

export default Board