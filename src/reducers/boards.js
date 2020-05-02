import { combineReducers } from "redux"
import { FETCH_BOARDS_BEGIN, FETCH_BOARDS_SUCCESS, FETCH_BOARDS_ERROR, SET_CURRENT_BOARD, DELETE_BOARD_BEGIN, DELETE_BOARD_SUCCESS } from "../actions/boards"
import { ADD_BOARD_BEGIN, ADD_BOARD_SUCCESS, ADD_BOARD_ERROR } from "../actions/boards"
import { EDIT_BOARD_BEGIN, EDIT_BOARD_SUCCESS, EDIT_BOARD_ERROR } from "../actions/boards"

const initialState = {
    boardsList: [],
    currentBoard: {},
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOARD_BEGIN:
            return {
                ...state,
                loading: true
            }
        case ADD_BOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                boardsList: [...state.boardsList, action.payload.board]
            }
        case EDIT_BOARD_BEGIN:
            return {
                ...state,
                loading: true
            }
        case EDIT_BOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                boardsList: state.boardsList.map((board) => {
                    if (board.id === action.payload.id) {
                        return {
                            ...board,
                            ...action.payload.updates
                        }
                    } else {
                        return board
                    }
                })
            }
        case DELETE_BOARD_BEGIN:
            return {
                ...state,
                loading: true
            }
        case DELETE_BOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                boardsList: state.boardsList.filter((board) => {
                    return board.id !== action.payload.id
                })
            }
        case FETCH_BOARDS_BEGIN:
            return {
                ...state,
                loading: true
            }
        case FETCH_BOARDS_SUCCESS:
            return {
                ...state,
                loading: false,
                boardsList: action.payload.boardsList
            }
        case SET_CURRENT_BOARD:
            return {
                ...state,
                currentBoard: action.payload.board
            }
        default:
            return state
    }
}

    // byId : {
    //     "board1" : {
    //         id: "board1",
    //         name: "board first",
    //         notes: ["note1", "note2"]
    //     },
    //     "board2" : {
    //         id: "board2",
    //         name: "board second",
    //         notes: ["note3", "note4"]
    //     }
    // },
    // allIds : ["board1", "board2"]

// const addNote = (state, action) => {
//     const { noteId, boardId } = action.payload

//     const board = state[boardId]

//     return {
//         ...state,
//         // update board with a note
//         [boardId]: {
//             ...board,
//             notes: board.notes.concat(noteId)
//         }
//     }
// }

// const boardsById = (state = {}, action) => {
//     switch (action.type) {
//         case "ADD_NOTE":
//             return addNote(state, action)
//         default:
//             return state
//     }
// }

// const allBoards = (state = [], action) => {

// }

// const boardsReducer = combineReducers({
//     byId: boardsById,
//     allIds: allBoards
// })

// export default boardsReducer