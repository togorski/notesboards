import { v1 as uuid } from "uuid"

export const addNote = (note) => ({
    type: "ADD_NOTE",
    note: {
        id: uuid(),
        ...note
    }
})

export const editNote = (id, updates) => ({
    type: "EDIT_NOTE",
    id,
    updates
})

export const deleteNote = (id) => ({
    type: "DELETE_NOTE",
    id
})