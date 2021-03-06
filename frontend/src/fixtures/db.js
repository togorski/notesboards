const reduxState = {
    boards : {
        byId : {
            "board1" : {
                id: "board1",
                name: "board first",
                //notes: ["note1", "note2"]
            },
            "board2" : {
                id: "board2",
                name: "board second",
                //notes: ["note3", "note4"]
            }
        },
    },
    notes : {
        byId : {
            "note1" : {
                id: "note1",
                board: "board1",
                title: "bleble",
                body: "ebe ebe",
                position: {
                    x: Math.random() * 400,
                    y: Math.random() * 400
                }
            },
            "note2" : {
                id: "note2",
                board: "board1",
                title: "ebe",
                body: "ebe",
                position: {
                    x: Math.random() * 400,
                    y: Math.random() * 400
                }
            },
            "note3" : {
                id: "note3",
                board: "board2",
                title: "aha",
                body: "ehe",
                position: {
                    x: Math.random() * 400,
                    y: Math.random() * 400
                }
            },
            "note4" : {
                id: "note4",
                board: "board2",
                title: "ehe",
                body: "haha",
                position: {
                    x: Math.random() * 400,
                    y: Math.random() * 400
                }
            }
        }
    }
}

export default reduxState