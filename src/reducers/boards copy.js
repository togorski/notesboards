import { combineReducers } from "redux"
import { FETCH_BOARDS_BEGIN, FETCH_BOARDS_SUCCESS, FETCH_BOARDS_ERROR, SET_CURRENT_BOARD, DELETE_BOARD_BEGIN, DELETE_BOARD_SUCCESS, DELETE_BOARD_ERROR, FETCH_BOARD_DETAILS_BEGIN, FETCH_BOARD_DETAILS_SUCCESS, FETCH_BOARD_DETAILS_ERROR } from "../constants/boardsConstants"
import { CREATE_BOARD_BEGIN, CREATE_BOARD_SUCCESS, CREATE_BOARD_ERROR } from "../constants/boardsConstants"
import { EDIT_BOARD_BEGIN, EDIT_BOARD_SUCCESS, EDIT_BOARD_ERROR } from "../constants/boardsConstants"

const initialState = {
    boardsList: [],
    currentBoard: {},
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BOARD_BEGIN:
            return {
                ...state,
                loading: true
            }
        case CREATE_BOARD_SUCCESS:
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

const boardDetailsReducer = (state = { board: {} }, action) => {
    switch (action.type) {
        case FETCH_BOARD_DETAILS_BEGIN:
            return {
                loading: true
            }
        case FETCH_BOARD_DETAILS_SUCCESS:
            return {
                loading: false,
                board: action.payload,
                success: true
            }
        case FETCH_BOARD_DETAILS_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
        }
}

const boardCreateReducer = (state = { board: {} }, action) => {
    switch (action.type) {
        case CREATE_BOARD_BEGIN:
            return {
                loading: true
            }
        case CREATE_BOARD_SUCCESS:
            return {
                loading: false,
                board: action.payload,
                success: true
            }
        case CREATE_BOARD_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
        }
}

const boardEditReducer = (state = { board: {}} , action) => {
    switch(action.type) {
        case EDIT_BOARD_BEGIN:
            return {
                loading: true
            }
        case EDIT_BOARD_SUCCESS:
            return {
                loading: false,
                board: action.payload,
                success: true
            }
        case EDIT_BOARD_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

const deleteBoardReducer = (state = { board: {}}, action) => {
    switch(action.type) {
        case DELETE_BOARD_BEGIN:
            return {
                loading: true
            }
        case DELETE_BOARD_SUCCESS:
            return {
                loading: false,
                board: action.payload,
                success: true
            }
        case DELETE_BOARD_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

const boardsListReducer = (state = { boards: [] }, action) => {
    switch (action.type) {
        case FETCH_BOARDS_BEGIN:
            return {
                loading: true,
                boards: []
            }
        case FETCH_BOARDS_SUCCESS:
            return {
                loading: false,
                boards: action.payload
            }
        case FETCH_BOARDS_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
        }
}

export { boardCreateReducer, boardEditReducer, deleteBoardReducer, boardsListReducer, boardDetailsReducer }