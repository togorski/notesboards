const notesInitial = [{ id:"1234", title: "title", body: "body" },
    { id:"4566", title: "new title", body: "bleble"},
    { id:"175656", title: "third note", body: "note body"}]

export default (state = notesInitial, action) => {
    switch (action.type) {
        case "ADD_NOTE":
            return [
                ...state,
                action.note
            ]
        case "EDIT_NOTE":
            return state.map((note) => {
                if (note.id === action.id) {
                    return {
                        ...note,
                        ...action.updates
                    }
                } else {
                    return note
                }
            })
        case "DELETE_NOTE":
            return state.filter((note) => {
                return note.id !== action.id
            })
        default:
            return state
    }
}