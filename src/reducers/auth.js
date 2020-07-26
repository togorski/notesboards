import { LOGIN_SUCCESS, LOGIN_BEGIN, LOGIN_ERROR } from "../constants/authConstants"

// currently BEGIN are not used
const authReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_BEGIN:
            return {
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                loading: false,
                displayName: action.payload.displayName,
                uid: action.payload.uid,
                photoURL: action.payload.photoURL,
                success: true
            }
        case LOGIN_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        case "LOGOUT":
            return {}
        default:
            return state
    }
}

export default authReducer