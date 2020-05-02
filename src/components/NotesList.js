import React, { useContext } from "react"
import Note from "./Note"
import NotesContext from "../context/notes-context"

const NotesList = () => {
    // useEffect(() => {
    //     resetNoteList()

    //     return () => {
    //         resetNoteList()
    //     }
    // }, [])
    
    const { notesActions, notes, boardId } = useContext(NotesContext)

    const createNote = () => {
        const newNote = {
            title: "Note Tile",
            body: "Note Body"
        }
        notesActions.startAddNote(newNote, boardId)
    }

    return (
        <div>
            <div>
                {notes.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
            <button onClick={createNote}>Create New Note</button>
        </div>
    )
}

export default NotesList