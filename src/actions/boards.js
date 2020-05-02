import { v1 as uuid } from "uuid"
import { editNoteBegin, editNoteSucess } from "./notes"

export const FETCH_BOARDS_BEGIN = "FETCH_BOARDS_BEGIN"
export const FETCH_BOARDS_SUCCESS = "FETCH_BOARDS_SUCCESS"
export const FETCH_BOARDS_ERROR = "FETCH_PRODUCTS_ERROR"

export const ADD_BOARD_BEGIN = "ADD_BOARD_BEGIN"
export const ADD_BOARD_SUCCESS = "ADD_BOARD_SUCCESS"
export const ADD_BOARD_ERROR = "ADD_BOARD_ERROR"

export const EDIT_BOARD_BEGIN = "EDIT_BOARD_BEGIN"
export const EDIT_BOARD_SUCCESS = "EDIT_BOARD_SUCCESS"
export const EDIT_BOARD_ERROR = "EDIT_BOARD_ERROR"

export const DELETE_BOARD_BEGIN = "DELETE_BOARD_BEGIN"
export const DELETE_BOARD_SUCCESS = "DELETE_BOARD_SUCCESS"
export const DELETE_BOARD_ERROR = "DELETE_BOARD_ERROR"

export const SET_CURRENT_BOARD = "SET_CURRENT_BOARD"

export const setCurrentBoard = (board = {}) => ({
    type: SET_CURRENT_BOARD,
    payload: {
        board
    }
})

export const addBoardBegin = () => ({
    type: ADD_BOARD_BEGIN,
})

export const addBoardSuccess = (board, id) => ({
    type: ADD_BOARD_SUCCESS,
    payload: {
        board: {
            id,
            ...board
        }
    }
})

export const startAddBoard = (board) => {
    return dispatch => {
        // console.log(board)
        dispatch(addBoardBegin())
        const id = uuid()
        const db = JSON.parse(localStorage.getItem("db"))
        db.boards.byId = { ...db.boards.byId,
            [id]: {
            id,
            ...board
        }}
        localStorage.setItem("db", JSON.stringify(db))
        return dispatch(addBoardSuccess(board, id))
    }
}

export const fetchBoardsBegin = () => ({
    type: FETCH_BOARDS_BEGIN
})

export const fetchBoardsSuccess = (boardsList) => ({
    type: FETCH_BOARDS_SUCCESS,
    payload: { boardsList }
})

export const fetchBoardsError = (error) => ({
    type: FETCH_BOARDS_ERROR,
    payload: { error }
})

// move to separate file?
export const startFetchBoards = () => {
    return dispatch => {
        dispatch(fetchBoardsBegin())
        // console.log(JSON.parse(localStorage.getItem("db")))
        const boards = Object.values(JSON.parse(localStorage.getItem("db")).boards.byId)
        // console.log(Object.values(boards))
        return dispatch(fetchBoardsSuccess(boards))
        // return boards
        // return boards
        // fetch('https://exampleapi.com/products')
        // .then(res => res.json())
        // .then(res => {
        //     if(res.error) {
        //         throw(res.error);
        //     }
        //     dispatch(fetchProductsSuccess(res.products);
        //     return res.products;
        // })
        // .catch(error => {
        //     dispatch(fetchProductsError(error));
        // })
    }
}

export const editBoardBegin = () => ({
    type: EDIT_BOARD_BEGIN
})

export const editBoardSuccess = (id, updates) => ({
    type: EDIT_BOARD_SUCCESS,
    payload: {
        id,
        updates
    }
})

export const startEditBoard = (id, updates) => {
    return dispatch => {
        dispatch(editBoardBegin())
        let db = JSON.parse(localStorage.getItem("db"))
        db.boards.byId[id] = { 
            ...db.boards.byId[id], 
            ...updates 
        }
        localStorage.setItem("db", JSON.stringify(db))
        return dispatch(editBoardSuccess(id, updates))
    }
}

export const deleteBoardBegin = () => ({
    type: DELETE_BOARD_BEGIN
})

export const deleteBoardSuccess = (id) => ({
    type: DELETE_BOARD_SUCCESS,
    payload: {
        id
    }
})

// this will also remove assigned notes
export const startDeleteBoard = (id) => {
    return dispatch => {
        dispatch(deleteBoardBegin())
        let db = JSON.parse(localStorage.getItem("db"))
        // remove board by dd
        delete db.boards.byId[id]

        //remove note with board id
        const filteredNotes = Object.values(db.notes.byId).filter((note) => {
            return note.board !== id
        })
        
        db.notes.byId = Object.assign({}, { ...filteredNotes })
        localStorage.setItem("db", JSON.stringify(db))
        dispatch(deleteBoardSuccess(id))
    }
}