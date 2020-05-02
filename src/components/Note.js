import React, { useState, useContext } from "react"
import NoteForm from "./NoteForm"
import NotesContext from "../context/notes-context"

// rename below and move to separate file
const ShowNote = ({note}) => (
    <>
        <h3>
            { note.title }
        </h3>
        <p>
            { note.body }
        </p>
    </>
)

const Note = ({ note }) => {
    const [editMode, setEditMode] = useState(false)
    const { notesActions, boardId } = useContext(NotesContext)
    const { startAddNote, startDeleteNote, startEditNote} = notesActions

    let onSubmit = () => {}

    const noteId = note.id

    if (note) {
        onSubmit = (note) => {
            startEditNote(noteId, note)
            setEditMode(false)
        }
    } else {
        onSubmit = (note) => {
            startAddNote(note, boardId)
            setEditMode(false)
        }
    }

    return (
        <div>
            {editMode ? <NoteForm note={note} onSubmit={onSubmit} /> : <ShowNote note={note}/>}
            {!editMode && <button onClick={() => setEditMode(true)}>Edit</button>}
            {<button onClick={() => startDeleteNote(note.id)}>Delete</button>}
        </div>
    )
}

export default Note