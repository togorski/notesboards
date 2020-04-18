import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import configureStore from "./store/configureStore"
import NotesBoardApp from './components/NotesBoardApp';
import * as serviceWorker from './serviceWorker';

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <NotesBoardApp />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
