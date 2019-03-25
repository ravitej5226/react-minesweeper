import React, { Component } from 'react'

export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameState: this.props.gameState,
            gameTime: this.props.gameTime
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick=()=> {
        if (this.props.gameState == 'RUNNING') {
            this.setState(prevState => ({
                gameTime: prevState.gameTime + 1
            }));
        }
    }


    render() {
        return (
            <div>
{this.state.gameTime}
            </div>
        )
    }
}
