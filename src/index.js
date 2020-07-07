import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import AppRouter from "./routers/AppRouter"
import configureStore from "./store/configureStore"
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker';
import db from "./fixtures/db"

const { store, persistor } = configureStore()
// const persistor = persistor()

// localStorage.setItem("db", JSON.stringify(db))
// let state = JSON.parse(localStorage.getItem("db"))

// console.log(Object.values(state.boards.byId))

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <AppRouter />
//     </React.StrictMode>
//   </Provider>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <AppRouter />
      {/* </PersistGate> */}
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
