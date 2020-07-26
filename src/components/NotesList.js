import React, { useContext, useEffect, useState } from "react"
import Note from "./Note"
import NotesContext from "../context/notes-context"
import { useSelector, useDispatch } from "react-redux"
import { startFetchNotes, startCreateNote } from "../actions/notes"
import NotesStack from "./NotesStack"

const NotesList = () => {
    const notesList = useSelector(state => state.notesList)
    const { notes, loading, error} = notesList

    const boardId = useSelector(state => state.boardDetails.board.id)

    const dispatch = useDispatch()

    const createNote = () => {
        const newNote = {
            title: "Note Tile",
            body: "Note Body",
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400
            }
        }
        dispatch(startCreateNote(newNote, boardId))
    }

    return (
        <div>
            <div>
                {notes.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
            <NotesStack />
            {/* add below for mobile */}
            {/* <button onClick={createNote}>Create New Note</button> */}
            
        </div>
    )
}
// wyjebac przekazywanie boardid
export default NotesList