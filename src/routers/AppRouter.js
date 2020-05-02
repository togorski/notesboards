import React from "react"
import { Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory as createHistory } from "history"
import BoardsListPage from "../components/BoardsListPage"
import NotesListPage from "../components/NotesListPage"

export const history = createHistory() //wrzucic w kontekst?

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={BoardsListPage} exact={true}/>
                <Route path="/:id" component={NotesListPage}/>
            </Switch>
        </div>
    </Router>
)

export default AppRouter