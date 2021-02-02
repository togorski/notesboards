import React, { useEffect } from "react"
import BoardForm from "./BoardForm"
import BoardList from "./BoardsList"
import Header from "./Header"
import { startCreateBoard, startFetchBoards, resetCreateBoard } from "../actions/boards"
import { useDispatch, useSelector } from "react-redux"
import "./boardsListPage.css"


const BoardsPage = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(resetCreateBoard())
        }
    }, [])
// MOVE START CREATE BOARD TO BOARD FORM
    return (
        <div className="container__boardsPage">
            <BoardForm onSubmit={(board) => dispatch(startCreateBoard(board))}/>
            <BoardList />
        </div>
    )
}

export default BoardsPage