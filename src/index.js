import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import AppRouter from "./routers/AppRouter"
import history from "./history"
import configureStore from "./store/configureStore"
import { firebase } from "./firebase/firebase"
import { login, logout, startLogin, loginSuccess } from "./actions/auth"
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker';
import db from "./fixtures/db"
import LoadingPage from './components/LoadingPage';

const { store } = configureStore()

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

let hasRendered = false

const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'))
    hasRendered = true
  }
}

ReactDOM.render(<LoadingPage />, document.getElementById('root'))

firebase.auth().onAuthStateChanged((user) => {
  console.log(user)
  // && !!user.uid
  if (user) {
    store.dispatch(loginSuccess(user.uid, user.displayName, user.photoURL))
    console.log("user is logged in")
    renderApp()
      if(history.location.pathname === "/") {
          history.push("/boards")
      }
  } else {
    console.log("user logged out or cleanup")
    store.dispatch(logout())
    renderApp()
    history.push("/")
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
