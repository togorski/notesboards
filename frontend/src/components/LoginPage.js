import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startLogin, startLogout } from "../actions/auth"

const LoginPage = () => {
    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)
    const { error: authError } = auth
    

    const handleLogin = () => dispatch(startLogin())
    
    return (
        <div>
            <div>{authError ? authError : "No error"}</div>
            <div>
                <button onClick={handleLogin}>Login with Google</button>
                <button onClick={() => dispatch(startLogout())}>Logout</button>
            </div>
            
        </div>
    )
}

export default LoginPage