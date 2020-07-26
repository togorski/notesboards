import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { persistStore, persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk"
import authReducer from "../reducers/auth"
import { notesListReducer, noteCreateReducer, noteEditReducer, noteDeleteReducer } from "../reducers/notes"
import { boardEditReducer, boardsListReducer, boardCreateReducer, boardDetailsReducer, boardDeleteReducer } from "../reducers/boards"

const composeEnhancers = 
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) :
    compose
    
// const composeEnhancers = compose

const persistConfig = {
    key: "root",
    storage
}

const rootReducer = combineReducers({
    auth: authReducer,
    notesList: notesListReducer,
    noteCreate: noteCreateReducer,
    noteEdit: noteEditReducer,
    noteDelete: noteDeleteReducer,
    boardDetails: boardDetailsReducer,
    boardsList: boardsListReducer,
    boardCreate: boardCreateReducer,
    boardEdit: boardEditReducer,
    boardDelete: boardDeleteReducer
})

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    // let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
    let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    // let persistor = persistStore(store)
    // return { store, persistor }
    return { store }
}
