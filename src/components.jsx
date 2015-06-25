import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'redux/react'
import * as actions from './actions'


class Dice {
  render() {
    const { dice } = this.props
    return (
      <div>
        Dice goes here
        {dice.map((val, idx) => <div key={idx}>{val}</div>)}
      </div>
    )
  }
}


@connect(state => ({
  dice: state.game.dice
}))
export class GameBoard {
  render() {
    const { dice, dispatch } = this.props
    const { roll, reset } = bindActionCreators(actions, dispatch)

    let gameContent = null
    if (! dice.length) {
      gameContent = <div>Roll to begin</div>
    }
    else {
      gameContent = <Dice dice={this.props.dice}/>
    }
    return (
      <div>
        <div>
          <button onClick={roll}>Roll</button>
          <button onClick={reset}>Reset</button>
        </div>
        <div>
          {gameContent}
        </div>
      </div>
    )
  }
}
