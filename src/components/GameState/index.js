import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class index extends Component {
  render() {
    return (
      <div>
       {this.props.gameState=='BUST'?(<FontAwesomeIcon icon={['far',"tired"]} />)
       :(this.props.gameState=='WIN'?
       (<FontAwesomeIcon icon={['far',"grin-hearts"]} />):

       <FontAwesomeIcon icon={['far',"smile"]} />)} 
        
      </div>
    )
  }
}
