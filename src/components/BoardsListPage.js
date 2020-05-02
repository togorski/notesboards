import React from "react"
import { connect } from "react-redux"
import BoardForm from "./BoardForm"
import BoardList from "./BoardsList"
import { startAddBoard } from "../actions/boards"

const BoardsPage = ({ startAddBoard }) => (
    <div>
        <BoardList />
        <BoardForm onSubmit={startAddBoard}/>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startAddBoard: (board) => {
        dispatch(startAddBoard(board))
    }
})

export default connect(null, mapDispatchToProps)(BoardsPage)