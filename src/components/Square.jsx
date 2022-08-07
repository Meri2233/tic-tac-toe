
function Square(props){
    return(
        <button onClick = {(e)=> props.updateBoard(e,props.row,props.col)} className="elements">{props.value}</button>
    )
}

export default Square