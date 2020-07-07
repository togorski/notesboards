import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import BoardCard from "./BoardCard"
import { startFetchBoards } from "../actions/boards"
// import { startFetchBoards, setCurrentBoard } from "../actions/boards"

const BoardsList = () => {
    const dispatch = useDispatch()

    const boardsList = useSelector(state => state.boardsList)
    const { loading: boardsListLoading, boards, error: boardsListError } = boardsList

    const boardCreate = useSelector(state => state.boardCreate)
    const { success: successCreate } = boardCreate

    useEffect(() => {
        dispatch(startFetchBoards())
    }, [successCreate]) // move fetch to page

    return (

        <div>
            {
                boardsListLoading ? <div>Loading...</div> :
                boards.length === 0 ? <div>No boards</div> :
                
                boards.map((board) => {
                    return (
                    // <Link to={board.id} key={board.id} onClick={() => setCurrentBoard(board)}>   
                    <Link to={"boards/" + board.id} key={board.id}>   
                        <BoardCard board={board}/>
                    </Link>    
                    )
                })
            }
        </div>
    )
}

export default BoardsList