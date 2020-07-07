import React, { useEffect } from "react"
import BoardForm from "./BoardForm"
import BoardList from "./BoardsList"
import { startCreateBoard, startFetchBoards } from "../actions/boards"
import { useDispatch, useSelector } from "react-redux"

const BoardsPage = (props) => {
    const dispatch = useDispatch()
// MOVE START CREATE BOARD TO BOARD FORM
    return (
        <div>
            <BoardList />
            <BoardForm onSubmit={(board) => dispatch(startCreateBoard(board))}/>
        </div>
    )
}

export default BoardsPage