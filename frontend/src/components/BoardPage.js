import React, { useEffect } from "react"
import history from "../history"
import BoardHeader from "./BoardHeader"
import NotesList from "./NotesList"
import { useDispatch, useSelector } from "react-redux"
import { resetNotesList, startFetchNotes, resetCreateNote, resetNotesReducers } from "../actions/notes"
import { startFetchBoardDetails, resetDeleteBoard, resetFetchBoardDetails } from "../actions/boards"
import selectBoard from "../selectors/boards"
import { Link } from "react-router-dom"
import "./boardPage.css"

// const BoardPage = ({ notesActions, boardsActions, notesLoading, notes, boardsList, currentBoard, match }) => {
const BoardPage = (props) => {
    const boardId = props.match.params.id
    const dispatch = useDispatch()
    const boardDetails = useSelector(state => state.boardDetails)
    const boardDelete = useSelector(state => state.boardDelete)
    const notesList = useSelector(state => state.notesList)
    const { loading: loadingBoardDetails, board: currentBoard, error: errorBoardDetails, success: successBoardDetails} = boardDetails
    const { loading: loadingNotes, error: errorNotes } = notesList
    const { loading: loadingBoardDelete, error: errorBoardDelete, success: successBoardDelete} = boardDelete

    useEffect(() => {
        dispatch(startFetchBoardDetails(boardId))
        dispatch(startFetchNotes(boardId))
        return () => {
            dispatch(resetNotesReducers())
            dispatch(resetFetchBoardDetails())
        }
    }, [])

    useEffect(() => {
        if (successBoardDelete) {
            dispatch(resetDeleteBoard())
            history.push("/boards")
        }    
    }, [successBoardDelete])

    // moze wystarczy pchnac props do Board Header z nazwa
    return (
        <div>
            <Link to="/boards" className="back" >Back to Main</Link>
            {
                loadingBoardDetails || loadingNotes ? <p>Loading</p> :
                errorBoardDetails ? <p>Error Board Loading : {errorBoardDetails} </p> :
                errorNotes ? <p>{currentBoard.name} - Failed to Load Notes</p> :
                <>
                    <BoardHeader />
                    <NotesList />
                </>
            }
            {/* <NotesContext.Provider value={{ notesActions, notes, boardId }}> 
                <NotesList />
                <NoteForm onSubmit={onSubmit}/> 
            </NotesContext.Provider> */}
        </div>
    )
}

export default BoardPage