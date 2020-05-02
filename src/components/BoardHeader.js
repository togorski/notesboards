import React, { useState, useContext } from "react"
import BoardEditForm from "./BoardEditForm"
import BoardsContext from "../context/boards-context"

// rename below and move to separate file
const ShowBoardHeader = ({ board }) => (
    <h1>
        {board.name}
    </h1>
)

const BoardHeader = () => {
    const [editMode, setEditMode] = useState(false)
    const { boardsActions, currentBoard } = useContext(BoardsContext)
    const { startEditBoard, startDeleteBoard } = boardsActions

    const onSubmit = (board) => {
        startEditBoard(currentBoard.id, board)
        setEditMode(false)
    }

    // handleOnDelete // push history back to the main page, delete all notes that were attached - create action delete notes where board = board.id

    return (
        <div>
            {editMode ? <BoardEditForm board={currentBoard} onSubmit={onSubmit} /> : <ShowBoardHeader board={currentBoard}/>}
            {!editMode && <button onClick={() => setEditMode(true)}>Edit</button>}
            {<button onClick={() => startDeleteBoard(currentBoard.id)}>Delete</button>}
        </div>
    )
}

export default BoardHeader