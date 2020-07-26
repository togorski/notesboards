import React from "react"
import { Router, Route, Switch } from "react-router-dom"
import history from "../history"
import BoardsListPage from "../components/BoardsListPage"
import BoardPage from "../components/BoardPage"
import LoginPage from "../components/LoginPage"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"


const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/boards" component={BoardsListPage} exact={true}/>
                <PrivateRoute path="/boards/:id" component={BoardPage}/>
                {/* <Route component={<p>404</p>} /> */}
            </Switch>
        </div>
    </Router>
)

export default AppRouter