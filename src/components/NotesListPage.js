import React, { useEffect } from "react"
import BoardHeader from "./BoardHeader"
import NoteForm from "./NoteForm"
import NotesList from "./NotesList"
import { connect } from "react-redux"
import { startAddNote, startEditNote, startDeleteNote, resetNoteList, startFetchNotes } from "../actions/notes"
import { startEditBoard, startDeleteBoard, setCurrentBoard, startFetchBoards } from "../actions/boards"
import selectBoard from "../selectors/boards"
import BoardsContext from "../context/boards-context"
import NotesContext from "../context/notes-context"

const BoardPage = ({ notesActions, boardsActions, notesLoading, notes, boardsList, currentBoard, match }) => {
    const boardId = match.params.id

    useEffect(() => {
        if (Object.keys(currentBoard).length === 0) {
            boardsActions.startFetchBoards() // move startFetchBoards to index
        }
        
        notesActions.startFetchNotes(boardId)

        return () => {
            notesActions.resetNoteList()
        }
    }, [])

    // if fetching boards will be moved to index then below can be moved to initial effect
    useEffect(() => {
        boardsActions.setCurrentBoard(selectBoard(boardId, boardsList))
    }, [boardsList])

    const onSubmit = (note) => {
        notesActions.startAddNote(note, boardId)
    }

    console.log(notesLoading)
    if (notesLoading) {
        console.log("was loading")
        return (
            <p>Loading</p>
            )
    }

    return (
        <div>
            <BoardsContext.Provider value={{ boardsActions, currentBoard }}>
                {notesLoading ? <p>Loading</p> : <BoardHeader />}
            </BoardsContext.Provider>
            <NotesContext.Provider value={{ notesActions, notes, boardId }}> 
                <NotesList />
                <NoteForm onSubmit={onSubmit}/> 
            </NotesContext.Provider>
        </div>
    )
}

// above - pass via context instead of props
// generate form on a proper page

const mapStateToProps = (state) => ({
    notes: state.notes.notesList,
    currentBoard: state.boards.currentBoard,
    boardsList: state.boards.boardsList,
    notesLoading: state.notes.loading
})

const mapDispatchToProps = (dispatch) => {
    return {
        notesActions: {
            startAddNote: (note, boardId) => dispatch(startAddNote(note, boardId)),
            startEditNote: (id, updates) => dispatch(startEditNote(id, updates)),
            startDeleteNote: (id) => dispatch(startDeleteNote(id)),
            resetNoteList: () => dispatch(resetNoteList()),
            startFetchNotes: (boardId) => dispatch(startFetchNotes(boardId))
        },
        boardsActions: {
            startEditBoard: (id, updates) => dispatch(startEditBoard(id, updates)),
            startDeleteBoard: (id) => dispatch(startDeleteBoard(id)),
            startFetchBoards: () => dispatch(startFetchBoards()),
            setCurrentBoard: (board) => dispatch(setCurrentBoard(board))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)