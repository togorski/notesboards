import React, { useState, useContext } from "react"
import NoteForm from "./NoteForm"
import NotesContext from "../context/notes-context"

const Note = ({ note }) => {
    const [editMode, setEditMode] = useState(false)
    const { addNote, editNote, deleteNote } = useContext(NotesContext)
    let onSubmit = () => {}

    const noteID = note.id

    if (note) {
        onSubmit = (note) => {
            editNote(noteID, note)
            setEditMode(false)
        }
    } else {
        onSubmit = (note) => {
            addNote(note)
            setEditMode(false)
        }
    }

    let toRender = ""

    if (editMode) {
        // toRender = <NoteForm note={note} editModeOff={editModeOff} />
        toRender = <NoteForm note={note} onSubmit={onSubmit} />
    } else {
        toRender =   
        <>
            <h3>
                { note.title }
            </h3>
            <p>
                { note.body }
            </p>
        </>
    }

    return (
        <div>
            {toRender}
            {!editMode && <button onClick={() => setEditMode(true)}>Edit</button>}
            {<button onClick={() => deleteNote(note.id)}>Delete</button>}
        </div>
    )
}

export default Note