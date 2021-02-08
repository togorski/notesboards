import React, { useRef, useState, useEffect, useCallback } from "react"
import { Rnd } from "react-rnd"
import { GithubPicker } from 'react-color';
import { useDispatch, useSelector } from "react-redux"
import { startCreateNote } from "../actions/notes"
import colors from "../fixtures/notesColors"
import "./notesStack.css"

const NoteStack = () => {
    // const pickerContainerRef = useRef()

    const boardId = useSelector(state => state.boardDetails.board.id)

    const [showColorPicker, setShowColorPicker] = useState(false)
    const [initPosition, setInitPosition] = useState({ x: 0, y: 0 })
    const [backgroundColor, setBackgroundColor] = useState(colors[2])

    const width = 200
    const height = 200
    const size = { width, height}

    const dispatch = useDispatch()

    const popover = {
        position: 'absolute',
        zIndex: '2',
    }

    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }

    // it should hide picker when clicked outside of the element
    const handleClickOutsidePicker = useCallback((e) => {
            const pickerPopover = document.getElementById('popoverPicker')
            
            // if picker is present and clicked element is not inside popover - hide picker
            pickerPopover && !pickerPopover.contains(e.target) && setShowColorPicker(false)
        }, [])

    useEffect(() => {
        document.body.addEventListener('click', handleClickOutsidePicker)

        return () => document.body.removeEventListener('click', handleClickOutsidePicker)
    }, [])

    const handleOnClick = () => {
        setShowColorPicker(!showColorPicker)
    }

    const handleHideColorPicker= () => {
        setShowColorPicker(false)
    }
    
    const handleOnColorChangeComplete = (color, event) => {
        setBackgroundColor(color.hex)
        setShowColorPicker(false)
    }

    const handleOnDragStop = (e, d) => {
        // create note only if it was moved more than size of NotesStack
        if (Math.abs(initPosition.x - d.x) > width || Math.abs(initPosition.y - d.lastY) > height) {
            const newNote = {
                title: "Note Tile",
                body: "Note Body",
                backgroundColor,
                position: { x: d.x, y: d.y },
                flagged: false,
                size
            }
            dispatch(startCreateNote(newNote, boardId))
        }
    }

    const handleOnDragStart = (e, d) => {
        //get init position to compare on drag stop if note should be created
        setInitPosition({ x: d.x, y: d.y})
    }
    
    return (
        <Rnd bounds="body"
            cancel=".cancelDrag"
            enableResizing={false}
            onDragStart={(e,d) => handleOnDragStart(e,d)}
            onDragStop={(e, d) => handleOnDragStop(e, d)}
            position={{x: 0, y: 0}}
            size={size}
            style={{backgroundColor}}
        >
            <div className="note">
                <p>
                    Drag to create
                </p>
                <button className="cancelDrag" onClick={handleOnClick}>Pick Color</button>
                { showColorPicker ? 
                <div id="popoverPicker" className="cancelDrag" style={ popover }>
                    <div id="pickerContainer" className="cancelDrag" onClick={handleHideColorPicker} style={ cover } />
                    <GithubPicker className="cancelDrag" colors={colors} onChangeComplete={handleOnColorChangeComplete}/>
                </div>: 
                null }
            </div>
        </Rnd>
    )}
        // extract button to separate component?

export default NoteStack