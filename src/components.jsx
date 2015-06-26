import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'redux/react'
import * as actions from './actions'
import _defaultStyles from './main.styl'
import _diceStyles from './dice.css'


class Die {
  render() {
    switch (this.props.number) {
      case 1:
        return (
          <div className="first-face">
            <span className="pip"></span>
          </div>
        )
      case 2:
        return (
          <div className="second-face">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        )
      case 3:
        return (
          <div className="third-face">
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        )
      case 4:
        return (
          <div className="fourth-face">
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>
            </div>
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="fifth-face">
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>
            </div>
            <div className="column">
              <span className="pip"></span>
            </div>
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>
            </div>
          </div>
        )
      case 6:
        return (
          <div className="sixth-face">
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>
              <span className="pip"></span>
            </div>
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>
              <span className="pip"></span>
            </div>
          </div>
        )
    }
  }
}

class Dice {
  render() {
    const { dice } = this.props
    return (
      <div className="dice">
        {dice.map((val, idx) => <Die key={idx} number={val}/>)}
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


class Tally {
  render() {
    const { scoring } = this.props
    return (
      <table>
        <tbody>
          <tr>
            <td>Ones</td><td>{scoring.ones}</td>
          </tr>
          <tr>
            <td>Twos</td><td>{scoring.twos}</td>
          </tr>
          <tr>
            <td>Threes</td><td>{scoring.threes}</td>
          </tr>
          <tr>
            <td>Fours</td><td>{scoring.fours}</td>
          </tr>
          <tr>
            <td>Fives</td><td>{scoring.fives}</td>
          </tr>
          <tr>
            <td>Sixes</td><td>{scoring.sixes}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}


@connect(state => state.game)
export class GameBoard {
  render() {
    const { dice, dispatch, rolls, score, scoring } = this.props
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
        <div>
          <Tally scoring={scoring}/>
        </div>
      </div>
    )
  }
}
