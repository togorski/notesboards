import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { startLogout } from "../actions/auth"
import "./header.css"

const Header = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const { displayName, photoURL } = auth
    return (
        <header>
            <div className="header__logo">
                <i className="fa fa-sticky-note-o"></i>
                <strong className="header__appName">Notes.</strong>
            </div>
            <div className="header__userArea">
                    <img className="header__photo" src={photoURL} />
                    <div className="header__userName">
                        <div>Hello, <strong>{displayName}</strong></div>
                        <button onClick={() => dispatch(startLogout())}>Logout</button>
                    </div>
                    
                    
                    {/* <i className="fa fa-caret-down" aria-hidden="true"></i> */}

            </div>
        </header>
    )
}

export default Header