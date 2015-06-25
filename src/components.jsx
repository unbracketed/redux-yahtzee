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


class Scoring {
  render() {
      const { score_ones } = this.props
      return (
          <button onClick={score_ones}>Ones</button>
      )
  }
}


@connect(state => state.game)
export class GameBoard {
  render() {
    const { dice, dispatch, rolls, score } = this.props
    const { roll, reset, score_ones } = bindActionCreators(actions, dispatch)

    let gameContent = null
    if (! dice.length) {
      if (! score) {
        gameContent = <div>Roll to begin</div>
      } else {
        gameContent = <div>Roll again</div>
      }
    }
    else {
      gameContent = <Dice dice={this.props.dice}/>
    }

    const rollButton = rolls === 3 ? '' : <button onClick={roll}>Roll</button>
    const scoringButtons = rolls > 0 ? <Scoring score_ones={score_ones}/> : ''

    return (
      <div>
        <div>
          {rollButton}
          <button onClick={reset}>Reset</button>
          <div>{score}</div>
          {scoringButtons}
        </div>
        <div>
          {gameContent}
        </div>
      </div>
    )
  }
}
