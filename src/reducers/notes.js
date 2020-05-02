// import { combineReducers } from "redux"

import { FETCH_NOTES_BEGIN, FETCH_NOTES_SUCCESS, FETCH_NOTES_ERROR, RESET_NOTE_LIST } from "../actions/notes"
import { ADD_NOTE_BEGIN, ADD_NOTE_SUCCESS, ADD_NOTE_ERROR } from "../actions/notes"
import { DELETE_NOTE_BEGIN, DELETE_NOTE_SUCCESS, DELETE_NOTE_ERROR } from "../actions/notes"
import { EDIT_NOTE_BEGIN, EDIT_NOTE_SUCCESS, EDIT_NOTE_ERROR } from "../actions/notes"

const initialState = {
    notesList: [],
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTE_BEGIN:
            return {
                ...state,
                loading: true
            }
        case ADD_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notesList: [
                    ...state.notesList,
                    action.payload.note
                ]
            }
        case EDIT_NOTE_BEGIN:
            return {
                ...state,
                loading: true
            }
        case EDIT_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notesList: state.notesList.map((note) => {
                    if (note.id === action.payload.id) {
                        return {
                            ...note,
                            ...action.payload.updates
                        } 
                    } else {
                            return note
                    }
                })
            }
        case DELETE_NOTE_BEGIN:
            return {
                ...state,
                loading: true
            }
        case DELETE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notesList: state.notesList.filter((note) => {
                    return note.id !== action.payload.id
                })
            }
        case FETCH_NOTES_BEGIN:
            return {
                ...state,
                loading: true,
                notesList: [], //get rid of that?
            }
        case FETCH_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                notesList: action.payload.notesList
            }
        case RESET_NOTE_LIST:
            return {
                ...state,
                notesList: []
            }
        default:
            return state
    }
}


// const addNoteEntry = (state, action) => {
//     const { noteId, note } = action.payload

//     note = {
//         id: noteId,
//         ...note
//     }

//     return {
//         ...state,
//         [noteId]: note
//     }
// }

// const notesById = (state = {}, action) => {
//     switch (action.type) {
//         case "ADD_NOTE":
//             return addNoteEntry(state, action)
//         default:
//             return state
//     }
// }

// const addNoteId = (state, action) => {
//     const { noteId } = action.payload
    
//     return state.concat(noteId)
// }

// const allNotes = (state = [], action) => {
//     switch (action.type) {
//         case "ADD_NOTE":
//             return addNoteId(addNoteId)
//         default:
//             return state
//     }
// }

// const notesReducer = combineReducers({
//     byId: notesById,
//     allIds: allNotes
// })

// export default notesReducer
