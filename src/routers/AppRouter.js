import React from "react"
import { Router, Route, Switch } from "react-router-dom"
import history from "../history"
import BoardsListPage from "../components/BoardsListPage"
import BoardPage from "../components/BoardPage"


const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={BoardsListPage} exact={true}/>
                <Route path="/boards/:id" component={BoardPage}/>
                {/* <Route component={<p>404</p>} /> */}
            </Switch>
        </div>
    </Router>
)

export default AppRouter