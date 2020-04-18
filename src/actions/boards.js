import { v1 as uuid } from "uuid"

export const addBoard = (board) => ({
    type: "ADD_BOARD",
    board: {
        id: uuid(),
        ...board
    }
})