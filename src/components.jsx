import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'redux/react'
import classNames from 'classnames'
import * as actions from './actions'
import _defaultStyles from './main.styl'
import _diceStyles from './dice.css'
import _gridStyles from './grid.css'


class Die {
  render() {
    const { onClick, isHeld } = this.props
    console.log('DIE', this.props)
    switch (this.props.number) {
      case 1:
        return (
          <div className="first-face" onClick={onClick}>
            <span className="pip"></span>
          </div>
        )
      case 2:
        return (
          <div className="second-face" onClick={onClick}>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        )
      case 3:
        return (
          <div className="third-face" onClick={onClick}>
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        )
      case 4:
        return (
          <div className="fourth-face" onClick={onClick}>
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
          <div className="fifth-face" onClick={onClick}>
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
          <div className="sixth-face" onClick={onClick}>
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
    const { dice, roll, rolls, hold, heldDice } = this.props
    const rollButton = rolls === 3 ? '' : <button onClick={roll}>Roll again</button>

    return (
        <div className="dice">
          {dice.map(function (val, idx) {
            console.log('checking held', _.contains(heldDice, idx))
            const cn = classNames(
              'die-container',
              {isHeld: _.contains(heldDice,idx)}
            )
            return  (
              <div className={cn}>
                <Die
                  key={idx}
                  number={val}
                  onClick={hold.bind(null, idx)}/>
              </div>
            )
          })}
          {rollButton}
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
  getNumberDisplay(key, scoring, isNewTurn, scoreMarkers) {
    let numDisplay = null
    if (scoring[key] === null){
      if (isNewTurn) {
        numDisplay =  '-'
      } else {
        numDisplay = <button onClick={scoreMarkers['score_' + key]}>Score</button>
      }
    } else {
      numDisplay = scoring[key]
    }

    return (
      <tr key={key}>
        <td>{key.charAt(0).toUpperCase() + key.substring(1)}</td>
        <td>{numDisplay}</td>
      </tr>
    )
  }

  render() {
    const { scoring, scoreMarkers, isNewTurn } = this.props
    const nums = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes']


    return (
      <table>
        <tbody>
          {nums.map(n => this.getNumberDisplay(n, scoring, isNewTurn, scoreMarkers))}
        </tbody>
      </table>
    )
  }
}


@connect(state => state.game)
export class GameBoard {
  render() {
    console.log('GAMEBOARD', this.props)
    const { dice, dispatch, rolls, score, scoring, isNewTurn, heldDice } = this.props
    const { roll, reset, hold } = bindActionCreators(actions, dispatch)

    let gameContent = null
    if (! dice.length) {
      if (! score) {
        gameContent = <div className="dice"><button onClick={roll}>Start Game</button></div>
      } else {
        gameContent = <div className="dice"><button onClick={roll}>Roll next turn</button></div>
      }
    }
    else {
      gameContent = <Dice dice={dice} roll={roll} rolls={rolls} hold={hold} heldDice={heldDice}/>
    }

    return (
      <div className="Grid" id="main">
        <div className="Grid-cell play-column">
          {gameContent}
        </div>
        <div className="Grid-cell Grid--1of3">
          <div id="score">Score: {score}</div>
          <Tally scoring={scoring} scoreMarkers={bindActionCreators(actions, dispatch)} isNewTurn={isNewTurn}/>
        </div>
      </div>
    )
  }
}
