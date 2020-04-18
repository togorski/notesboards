import React from "react"
import NoteForm from "./NoteForm"
import NotesList from "./NotesList"
import { connect } from "react-redux"
import { addNote } from "../actions/notes"

const NotesBoardApp = ({ addNote }) => {
    const onSubmit = (note) => {
        addNote(note)
    }
    return (
        <div>
            <NotesList />
            <NoteForm onSubmit={onSubmit}/> 
        </div>
    )
}
// add note temporarily here until it will be replaced with board page

// above - pass via context instead of props
// generate form on a proper page

const mapDispatchToProps = (dispatch) => ({
    addNote: (note) => dispatch(addNote(note))
})

export default connect(null, mapDispatchToProps)(NotesBoardApp)