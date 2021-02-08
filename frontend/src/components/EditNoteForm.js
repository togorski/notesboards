import React, { useState, useEffect, useCallback } from "react"
import { GithubPicker } from 'react-color'
import colors from "../fixtures/notesColors"

const NoteForm = ({ note, onSubmit, changeBackgroundColor }) => {

    const [title, setTitle] = useState(note ? note.title : "")
    const [body, setBody] = useState(note ? note.body : "")
    
    const [showColorPicker, setShowColorPicker] = useState(false)

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

    const handleOnClick = () => {
        setShowColorPicker(!showColorPicker)
    }

    const handleHideColorPicker= () => {
        setShowColorPicker(false)
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

    const handleOnColorChangeComplete = (color) => {
        changeBackgroundColor(color.hex)
        setShowColorPicker(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ title, body, })
        setTitle("")
        setBody("")
    }

    return (
        <div >
            <form className="cancelDrag" onSubmit={handleSubmit}>
                
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
                <textarea onChange={(e) => setBody(e.target.value)} value={body}></textarea>
                <button type="submit">Save</button>
                <div>
                    <button type="button" className="cancelDrag" onClick={handleOnClick}>Pick Color</button>
                    { showColorPicker ? 
                    <div id="popoverPicker" className="cancelDrag" style={ popover }>
                        <div id="pickerContainer" className="cancelDrag" onClick={handleHideColorPicker} style={ cover } />
                        <GithubPicker className="cancelDrag" colors={colors} onChangeComplete={handleOnColorChangeComplete}/>
                    </div>: null }
                </div>
            </form>
        </div>
    )
}

export default NoteForm