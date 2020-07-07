import * as firebase from "firebase"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzelN22Cinc7NSuAf8RUtOqAUmKkBz938",
    authDomain: "boardlist-92451.firebaseapp.com",
    databaseURL: "https://boardlist-92451.firebaseio.com",
    projectId: "boardlist-92451",
    storageBucket: "boardlist-92451.appspot.com",
    messagingSenderId: "36320386328",
    appId: "1:36320386328:web:4794c942917c38c610126d"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.database.enableLogging(true);

const database = firebase.database()

export { firebase, database as default }