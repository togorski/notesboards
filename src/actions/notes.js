import database from "../firebase/firebase"
import { FETCH_NOTES_BEGIN, FETCH_NOTES_SUCCESS, FETCH_NOTES_ERROR, FETCH_NOTE_DETAILS_BEGIN, FETCH_NOTE_DETAILS_SUCCESS, FETCH_NOTE_DETAILS_ERROR, RESET_FETCH_NOTES, CREATE_NOTE_SUCCESS, CREATE_NOTE_ERROR, RESET_CREATE_NOTE, DELETE_NOTE_BEGIN, DELETE_NOTE_SUCCESS, DELETE_NOTE_ERROR, RESET_DELETE_NOTE, EDIT_NOTE_BEGIN, EDIT_NOTE_SUCCESS, EDIT_NOTE_ERROR, CREATE_NOTE_BEGIN, RESET_EDIT_NOTE } from "../constants/notesConstants"

/* NOTES FETCH */

export const fetchNotesBegin = () => ({
    type: FETCH_NOTES_BEGIN
})

export const fetchNotesSuccess = (notesList) => ({
    type: FETCH_NOTES_SUCCESS,
    payload: notesList
})

export const fetchNotesError = (error) => ({
    type: FETCH_NOTES_ERROR,
    payload: error
})

export const startFetchNotes = (boardId) => {
    return async dispatch => {
        try {
            dispatch(fetchNotesBegin())

            let notes = []
    
            const notesSnapshot = 
                await database.ref("notes").orderByChild("board").equalTo(boardId).once("value")
            
            notesSnapshot.forEach(childSnapshot => {
                notes.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
    
            dispatch(fetchNotesSuccess(notes))
        } catch (error) {
            console.log(error)
            dispatch(fetchNotesError(error.message))
        }
        
    }
}

export const resetNotesList = () => ({
    type: RESET_FETCH_NOTES
})

// * NOTE CREATE * //

// on begin create a placeholder note
export const createNoteBegin = (note) => ({
    type: CREATE_NOTE_BEGIN,
    payload: {
        id: "temp",
        ...note
    }
})

export const createNoteSuccess = (note, noteId, boardId) => ({ //CREATE boardId inside of the component
    type: CREATE_NOTE_SUCCESS,
    payload: {
        id: noteId,
        board: boardId,
        ...note
    }
})

export const createNoteError = () => ({
    type: CREATE_NOTE_ERROR
})

export const resetCreateNote = () => ({
    type: RESET_CREATE_NOTE
})

export const startCreateNote = (note, boardId) => {
    return async dispatch => {
        try {
            dispatch(createNoteBegin(note))

            const newNote = {
                board: boardId,
                ...note
            }
    
            const noteRef = await database.ref("notes").push({...newNote})
            dispatch(createNoteSuccess(newNote, noteRef.key, boardId))
        } catch (error) {
            console.log(error)
            dispatch(createNoteError(error.message))
        }
    }
}

// * NOTE DELETE * //

export const deleteNoteBegin = () => ({
    type: DELETE_NOTE_BEGIN
})

export const deleteNoteSuccess = (id) => ({
    type: DELETE_NOTE_SUCCESS,
    payload: id
})

export const deleteNoteError = () => ({
    type: DELETE_NOTE_ERROR
})

export const resetDeleteNote = () => ({
    type: RESET_DELETE_NOTE
})

export const startDeleteNote = (id) => {
    return async dispatch => {
        try {
            dispatch(deleteNoteBegin())
            await database.ref(`notes/${id}`).remove()
            dispatch(deleteNoteSuccess(id))
        } catch (error) {
            console.log(error)
            dispatch(deleteNoteError(error.message))
        }
    }
}

/* NOTE EDIT */

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

export const editNoteError = () => ({
    type: EDIT_NOTE_ERROR
})

export const resetEditNote = () => ({
    type: RESET_EDIT_NOTE
})

export const startEditNote = (id, updates) => {
    return async dispatch => {
        try {
            dispatch(editNoteBegin())
            await database.ref(`notes/${id}`).update(updates)
            dispatch(editNoteSucess(id, updates)) // jebany handling nie dziala
        } catch (error) {
            console.log(error)
            dispatch(editNoteError(error.message))
        }
    }
}

export const resetNotesReducers = () => {
    return dispatch => {
        dispatch(resetCreateNote())
        dispatch(resetEditNote())
        dispatch(resetDeleteNote())
        dispatch(resetNotesList())
    }
}