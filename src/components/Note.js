import React, { useState, useContext, useEffect, useRef } from "react"
import Draggable from 'react-draggable'
import { ResizableBox } from "react-resizable"
import { Rnd } from "react-rnd"
import EditNoteForm from "./NoteForm"
import { useDispatch, useSelector } from "react-redux"
import { startEditNote, startDeleteNote } from "../actions/notes"
import "./note.css"

// maybe put note size to env

const Note = ({ note }) => {
    const noteDelete = useSelector(state => state.noteDelete)
    const { loading: loadingDelete, noteId: deleteNoteId, error: errorDelete, success: successDelete} = noteDelete

    const [editMode, setEditMode] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [position, setPosition] = useState({ x: note.position.x, y: note.position.y })
    // change stack to rnd and pass size
    const [size, setSize] = useState({ width: note.size.width ? note.size.width : 200, 
                                    height: note.size.height ? note.size.height : 200})
    const [flagged, setFlagged] = useState(note.flagged ? note.flagged : false)

    const dispatch = useDispatch()
    
    // useEffect and redux + local state or purely local state for below loader?
    // useEffect(() => {
    //     console.log(deleteNoteId, note.id)
    //     if (deleteNoteId === note.id) setDeleting(false)
    //     // console.log(loadingDelete)
    // }, [loadingDelete])

    const onSubmit = (noteUpdate) => {
        dispatch(startEditNote(note.id, noteUpdate))
        setEditMode(false)
    } 

    const handleDelete = (noteId) => {
        setDeleting(true)
        dispatch(startDeleteNote(noteId))
        // on error set deleting to false and display error on the page component or somewhere here
    }

    const handleOnDragStop = (e, d) => {
        // change position only if it was moved by at least 0.5
        if (Math.abs(position.x - d.x) > 0.5 || Math.abs(position.y - d.y) > 0.5) {
            setPosition({ x: d.x, y: d.y })

            dispatch(startEditNote(note.id, {
                position: {x: d.x, y: d.y}
            }))
        }
    }

    const handleOnResize = (ref) => {
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight })

        dispatch(startEditNote(note.id, {
            size: { width: ref.offsetWidth, height: ref.offsetHeight }
        }))
    }

    const handleOnClickFlag = () => {
        setFlagged(!flagged)

        dispatch(startEditNote(note.id, { flagged: !flagged }))
    }

    return (
        <Rnd position={{ x: position.x, y: position.y}}
            minWidth={150} minHeight={150}
            size={{ width: size.width, height: size.height}}
            onDragStop={(e, d) => handleOnDragStop(e, d)}
            onResize={(e, direction, ref) => handleOnResize(ref)}
            style={{backgroundColor: note.backgroundColor ? note.backgroundColor : "green"}} // change to state
        >
            <div className="note">
                {editMode ? <EditNoteForm note={note} onSubmit={onSubmit} /> :
                <>
                    <div className="note-content">
                        <h3 className="note-header">
                            { note.title }
                        </h3>
                        <p className="note-body">
                            { note.body }
                        </p>
                    </div>

                    <div className="note-buttons">
                        <button onClick={() => setEditMode(true)}>Edit</button>
                        <button onClick={() => handleDelete(note.id)}>Delete {deleting && "loading"}</button>
                        <button onClick={() => handleOnClickFlag()}>
                            {flagged ? "flagged" : "no flag"}
                        </button>
                    </div>
                </>
                }
            </div>
        </Rnd>
    )
}

export default Note