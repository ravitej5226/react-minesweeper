import React, { Component } from 'react'
import * as common from '../../shared/common'
export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameState: this.props.gameState,
            gameTime: this.props.gameTime,
            formattedGameTime:common.getFormattedTime(this.props.gameTime.toString())
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
                gameTime: prevState.gameTime + 1,
                formattedGameTime:common.getFormattedTime(prevState.gameTime + 1)
            }));
        }
    }


    render() {
        return (
            <div>
{this.state.formattedGameTime}
            </div>
        )
    }
}
