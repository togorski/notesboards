import React, { useState, useContext } from "react"
import BoardEditForm from "./BoardEditForm"
import BoardsContext from "../context/boards-context"
import { startEditBoard, startDeleteBoard } from "../actions/boards"
import { useDispatch, useSelector } from "react-redux"

const BoardHeader = () => {
    const [editMode, setEditMode] = useState(false)
    
    const dispatch = useDispatch()
    const boardDetails = useSelector(state => state.boardDetails)
    const { board } = boardDetails
    const boardEdit = useSelector(state => state.boardEdit)
    const { success: boardEditSuccess, loading: boardEditLoading, error: boardEditError } = boardEdit

    const onSubmit = (boardUpdate) => {
        dispatch(startEditBoard(board.id, boardUpdate))
        setEditMode(false)
        // board.name = boardUpdate.name
    }

    // handleOnDelete // push history back to the main page, delete all notes that were attached - create action delete notes where board = board.id

    return (
        <div>
            {/* replace with loader */}
            { boardEditLoading && <p>Board Edit Loading</p> }
            { boardEditError && <p>Board Edit Error: {boardEditError}</p> }
            {editMode ? 
            <BoardEditForm board={board} onSubmit={onSubmit} /> :
                <>
                    <h1>
                        {board.name}
                    </h1>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </>
            }
            {<button onClick={() => dispatch(startDeleteBoard(board.id))}>Delete</button>}
        </div>
    )
}

export default BoardHeader