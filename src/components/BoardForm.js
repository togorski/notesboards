import React, { useState } from "react"

const BoardForm = ({ onSubmit }) => {
    const [boardName, setBoardName] = useState("")
    const [error, setError] = useState("")

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setError("")
        if (!boardName.trim()) {
            setError("board name can't be empty")
        } else {
            onSubmit({ name: boardName })
            setBoardName("")
        }
    }

    const handleOnChange = (e) => {
        setBoardName(e.target.value)
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                {error && <p>{error}</p>}
                <input type="text" placeholder="Board Name" onChange={handleOnChange} value={boardName}></input>
                <button>Create</button>
            </form>
        </div>
    )
}

export default BoardForm