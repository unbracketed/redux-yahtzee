import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'redux/react';
import * as actions from './actions'
import Dice from './components'

// @connect
class GameApp extends Component {
  render() {
    const {dice, dispatch} = this.props
    return (
      <Dice
        dice={dice}
        {...bindActionCreators(actions, dispatch)}
      />
    )
  }
}

React.render(<GameApp/>, document.body)
