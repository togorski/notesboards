import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import BoardCard from "./BoardCard"
import { startFetchBoards, setCurrentBoard } from "../actions/boards"

const BoardsList = ({boards = [], startFetchBoards, setCurrentBoard}) => {
    
    useEffect(() => {
        startFetchBoards()
    }, []) // move fetch to page

    return (
        <div>
            {boards.map((board) => {
                return (
                <Link to={board.id} key={board.id} onClick={() => setCurrentBoard(board)}>   
                    <BoardCard board={board}/>
                </Link>    
                )
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        boards: state.boards.boardsList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startFetchBoards: () => dispatch(startFetchBoards()),
        setCurrentBoard: (board) => dispatch(setCurrentBoard(board))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardsList)