import { firebase, googleAuthProvider} from "../firebase/firebase"
import { LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERROR } from "../constants/authConstants"

export const loginBegin = () => ({
    type: LOGIN_BEGIN
})

export const loginSuccess = (uid, displayName, photoURL) => ({
    type: LOGIN_SUCCESS,
    payload: { 
        displayName,
        photoURL,
        uid
    }
})

export const loginError = (error) => ({
    type: LOGIN_ERROR,
    payload: error
})

export const startLogin = () => {
    return async dispatch => { 
        try {
            dispatch(loginBegin())
            // dispatch success will be triggered in index
            await firebase.auth().signInWithPopup(googleAuthProvider)
            // .then((user) => dispatch(loginSuccess(user.uid, user.displayName)))
        } catch (error) {
            dispatch(loginError(error.message))
        }
        
    }
}

export const logout = () => ({
    type: "LOGOUT"
})

export const startLogout = () => (
    () => {
        return firebase.auth().signOut()
    }
)