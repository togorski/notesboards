import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import thunk from "redux-thunk"
import notesReducer from "../reducers/notes"
import boardsReducer from "../reducers/boards"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(combineReducers({
        notes: notesReducer,
        boards: boardsReducer
    }), composeEnhancers(applyMiddleware(thunk)))

    return store
}
