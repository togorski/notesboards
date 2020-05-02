import { v1 as uuid } from "uuid"

export const ADD_NOTE_BEGIN = "ADD_NOTE_BEGIN"
export const ADD_NOTE_SUCCESS = "ADD_NOTE_SUCCESS"
export const ADD_NOTE_ERROR = "ADD_NOTE_ERROR"

export const DELETE_NOTE_BEGIN = "DELETE_NOTE_BEGIN"
export const DELETE_NOTE_SUCCESS = "DELETE_NOTE_SUCCESS"
export const DELETE_NOTE_ERROR = "DELETE_NOTE_ERROR"

export const EDIT_NOTE_BEGIN = "EDIT_NOTE_BEGIN"
export const EDIT_NOTE_SUCCESS = "EDIT_NOTE_SUCCESS"
export const EDIT_NOTE_ERROR = "EDIT_NOTE_ERROR"

export const FETCH_NOTES_BEGIN = "FETCH_NOTES_BEGIN"
export const FETCH_NOTES_SUCCESS = "FETCH_NOTES_SUCCESS"
export const FETCH_NOTES_ERROR = "FETCH_NOTES_ERROR"

export const RESET_NOTE_LIST = "RESET_NOTE_LIST"

export const fetchNotesBegin = () => ({
    type: FETCH_NOTES_BEGIN
})

export const fetchNotesSuccess = (notesList) => ({
    type: FETCH_NOTES_SUCCESS,
    payload: { notesList }
})

export const fetchNotesError = (error) => ({
    type: FETCH_NOTES_ERROR,
    payload: { error }
})

export const startFetchNotes = (boardId) => {
    return dispatch => {
        dispatch(fetchNotesBegin())
        const dbnotes = Object.values(JSON.parse(localStorage.getItem("db")).notes.byId)
        const notes = dbnotes.filter((note) => note.board === boardId)
        // console.log(notes)
        return dispatch(fetchNotesSuccess(notes))
    }
}

export const resetNoteList = () => ({
    type: RESET_NOTE_LIST
})

export const addNoteBegin = () => ({
    type: ADD_NOTE_BEGIN
})

export const addNoteSuccess = (note, boardId) => ({ //add boardId inside of the component
    type: ADD_NOTE_SUCCESS,
    payload: {
        note: {
            id: uuid(),
            board: boardId,
            ...note
        }
    }
})

export const startAddNote = (note, boardId) => {
    return dispatch => {
        dispatch(addNoteBegin())
        const id = uuid()
        const newNote = {
            id,
            board: boardId,
            ...note
        }
        // console.log(newNote)
        let db = JSON.parse(localStorage.getItem("db"))
        db.notes.byId = {
            ...db.notes.byId,
            [id]: {
                ...newNote
            }
        }
        localStorage.setItem("db", JSON.stringify(db))
        return dispatch(addNoteSuccess(newNote, boardId))
    }
}

export const deleteNoteBegin = () => ({
    type: DELETE_NOTE_BEGIN
})

export const deleteNoteSuccess = (id) => ({
    type: DELETE_NOTE_SUCCESS,
    payload: {
        id
    }
})

export const startDeleteNote = (id) => {
    return dispatch => {
        dispatch(deleteNoteBegin)
        let db = JSON.parse(localStorage.getItem("db"))
        delete db.notes.byId[id]
        localStorage.setItem("db", JSON.stringify(db))
        return dispatch(deleteNoteSuccess(id))
    }
}

export const editNoteBegin = () => ({
    type: EDIT_NOTE_BEGIN
})

export const editNoteSucess = (id, updates) => ({
    type: EDIT_NOTE_SUCCESS,
    payload: {
        id,
        updates
    }
})

export const startEditNote = (id, updates) => {
    return dispatch => {
        dispatch(editNoteBegin())
        let db = JSON.parse(localStorage.getItem("db"))
        db.notes.byId[id] = {
            ...db.notes.byId[id],
            ...updates
        }
        localStorage.setItem("db", JSON.stringify(db))
        return dispatch(editNoteSucess(id, updates))
    }
}