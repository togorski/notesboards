import { SET_CURRENT_BOARD, CREATE_BOARD_BEGIN, CREATE_BOARD_SUCCESS, FETCH_BOARD_DETAILS_BEGIN, FETCH_BOARD_DETAILS_SUCCESS, FETCH_BOARD_DETAILS_ERROR, RESET_FETCH_BOARD_DETAILS, FETCH_BOARDS_BEGIN, FETCH_BOARDS_SUCCESS, FETCH_BOARDS_ERROR, EDIT_BOARD_BEGIN, EDIT_BOARD_SUCCESS, DELETE_BOARD_BEGIN, DELETE_BOARD_SUCCESS, CREATE_BOARD_ERROR, DELETE_BOARD_ERROR, RESET_DELETE_BOARD, EDIT_BOARD_ERROR } from "../constants/boardsConstants"
import database from "../firebase/firebase"

export const setCurrentBoard = (board = {}) => ({
    type: SET_CURRENT_BOARD,
    payload: {
        board
    }
})

export const fetchBoardDetailsBegin = () => ({
    type: FETCH_BOARD_DETAILS_BEGIN
})

export const fetchBoardDetailsSuccess = (board) => ({
    type: FETCH_BOARD_DETAILS_SUCCESS,
    payload: board
})

export const fetchBoardDetailsError = (error) => ({
    type: FETCH_BOARD_DETAILS_ERROR,
    payload: error
})

export const resetFetchBoardDetails = () => ({
    type: RESET_FETCH_BOARD_DETAILS
})

export const startFetchBoardDetails = (boardId) => {
    return async dispatch => {
        try {
            dispatch(fetchBoardDetailsBegin())
            const boardSnapshot = await database.ref(`boards/${boardId}`).once("value")
            if (boardSnapshot.exists()) {
                dispatch(fetchBoardDetailsSuccess({
                    id: boardSnapshot.key,
                    ...boardSnapshot.val()
                }))
            } else {
                console.log(`Board with id ${boardId} not found`)
                dispatch(fetchBoardDetailsError(`Board with id ${boardId} not found`))
            }

        } catch (error) {
            console.log(error)
            dispatch(fetchBoardDetailsError(error.message))
        }
    }
}

export const createBoardBegin = () => ({
    type: CREATE_BOARD_BEGIN,
})

export const createBoardSuccess = (board, id) => ({
    type: CREATE_BOARD_SUCCESS,
    payload: {
        id,
        ...board
    }
})

export const createBoardError = (error) => ({
    type: CREATE_BOARD_ERROR,
    payload: error
})

export const startCreateBoard = (board) => {
    return async dispatch => {
        try {
            dispatch(createBoardBegin())
            const boardRef = await database.ref("boards").push({...board})
            dispatch(createBoardSuccess(board, boardRef.key))
        } catch (error) {
            console.log(error)
            dispatch(fetchBoardsError(error.message))
        }
    }
}

export const fetchBoardsBegin = () => ({
    type: FETCH_BOARDS_BEGIN
})

export const fetchBoardsSuccess = (boardsList) => ({
    type: FETCH_BOARDS_SUCCESS,
    payload: boardsList
})

export const fetchBoardsError = (error) => ({
    type: FETCH_BOARDS_ERROR,
    payload: error
})

export const startFetchBoards = () => {
    return async dispatch => {
        try {
            dispatch(fetchBoardsBegin())
            const boardsSnap = await database.ref("boards").once("value")
            
            let boards = []
    
            boardsSnap.forEach((childSnapshot) => {
                boards.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(fetchBoardsSuccess(boards))
        } catch (error) {
            console.log(error)
            dispatch(fetchBoardsError(error.message))
        }
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

export const editBoardError = (error) => ({
    type: EDIT_BOARD_ERROR,
    payload: error
})

export const startEditBoard = (id, updates) => {
    return async dispatch => {
        try {
            dispatch(editBoardBegin())
            const snapshot = await database.ref(`boards/${id}`).once("value")

            if (snapshot.exists()) {
                await database.ref(`boards/${id}`).update(updates)
                dispatch(editBoardSuccess(id, updates)) 
            } else {
                console.log(`Board with id ${id} not found`)
                dispatch(editBoardError(`Board with id ${id} not found`))
            }
        } catch (error) {
            console.log(error)
            dispatch(editBoardError(error.message))
        }

    }
}

export const deleteBoardBegin = () => ({
    type: DELETE_BOARD_BEGIN
})

export const deleteBoardSuccess = (id) => ({
    type: DELETE_BOARD_SUCCESS,
    payload: id
})

export const deleteBoardError = (error) => ({
    type: DELETE_BOARD_ERROR,
    payload: error
})

export const resetDeleteBoard = () => ({
    type: RESET_DELETE_BOARD
})

// this will also remove assigned notes
export const startDeleteBoard = (id) => {
    return async dispatch => {
        try {
            dispatch(deleteBoardBegin())
            await database.ref(`boards/${id}`).remove()
            dispatch(deleteBoardSuccess(id))
        } catch (error) {
            console.log(error)
            dispatch(deleteBoardError(error.message))
        }

        // deleted board notes cleanup in db
        try {
            // get all notes that belongs to deleted board
            const notesSnap = await database.ref("notes").orderByChild("board").equalTo(id).once("value")
            
            // remove notes
            notesSnap.forEach(childSnapshot => { database.ref(`notes/${childSnapshot.key}`).remove() })
        } catch (error) {
            console.log(error)
            // to think on what we can do in such case - no problem for app itself, just messy database
        }
    }
}