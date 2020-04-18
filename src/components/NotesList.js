import React from "react"
import { connect } from "react-redux"
import Note from "./Note"
import { addNote, editNote, deleteNote } from "../actions/notes"
import NotesContext from "../context/notes-context"

// create Board component, render NoteList there
const NotesList = ({ notes, addNote, editNote, deleteNote }) => {
    const createNote = () => {
        const newNote = {
            title: "Note Tile",
            body: "Note Body"
        }
        addNote(newNote)
    }

    return (
        <NotesContext.Provider value={{ addNote, editNote, deleteNote }}> 
            <div>
                {notes.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
            <button onClick={createNote}>Create New Note</button>
        </NotesContext.Provider>
    )
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes // filter + move it to board and pass prop
    }
}

const mapDispatchToProps = (dispatch) => ({
    addNote: (note) => dispatch(addNote(note)),
    editNote: (id, updates) => dispatch(editNote(id, updates)),
    deleteNote: (id) => dispatch(deleteNote(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotesList)