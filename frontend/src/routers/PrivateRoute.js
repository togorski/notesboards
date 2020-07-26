import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router-dom"
import Header from "../components/Header"

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const auth = useSelector(state => state.auth)
    const { uid, loading } = auth
    const isAuthenticated = !!uid
    // console.log(isAuthenticated)
    return (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div>
                    <Header/>
                    <div className="content-container">
                        <Component {...props} />
                    </div>
                </div>
            ) : (
                <Redirect to="/login" />
            )
        )}/>
    )
}


export default PrivateRoute