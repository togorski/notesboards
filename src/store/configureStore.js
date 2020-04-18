import { createStore, combineReducers, compose } from 'redux'
import notesReducer from "../reducers/notes"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => (
    createStore(combineReducers({
        notes: notesReducer
    }), composeEnhancers())
)
