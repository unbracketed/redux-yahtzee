import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import _ from 'lodash'
import * as actions from './actions'
import './styles/main.styl'
import './styles/dice.css'
import './styles/grid.css'

class Die {
  render () {
    const { onClick } = this.props
    switch (this.props.number) {
      case 1:
        return (
          <div className='first-face' onClick={onClick}>
            <span className='pip'></span>
          </div>
        )
      case 2:
        return (
          <div className='second-face' onClick={onClick}>
            <span className='pip'></span>
            <span className='pip'></span>
          </div>
        )
      case 3:
        return (
          <div className='third-face' onClick={onClick}>
            <span className='pip'></span>
            <span className='pip'></span>
            <span className='pip'></span>
          </div>
        )
      case 4:
        return (
          <div className='fourth-face' onClick={onClick}>
            <div className='column'>
              <span className='pip'></span>
              <span className='pip'></span>
            </div>
            <div className='column'>
              <span className='pip'></span>
              <span className='pip'></span>
            </div>
          </div>
        )
      case 5:
        return (
          <div className='fifth-face' onClick={onClick}>
            <div className='column'>
              <span className='pip'></span>
              <span className='pip'></span>
            </div>
            <div className='column'>
              <span className='pip'></span>
            </div>
            <div className='column'>
              <span className='pip'></span>
              <span className='pip'></span>
            </div>
          </div>
        )
      case 6:
        return (
          <div className='sixth-face' onClick={onClick}>
            <div className='column'>
              <span className='pip'></span>
              <span className='pip'></span>
              <span className='pip'></span>
            </div>
            <div className='column'>
              <span className='pip'></span>
              <span className='pip'></span>
              <span className='pip'></span>
            </div>
          </div>
        )
    }
  }
}
Die.propTypes = {
  onClick: React.PropTypes.function,
  number: React.PropTypes.number
}

class Dice {
  render () {
    const { dice, roll, rolls, hold, heldDice } = this.props
    const rollButton = rolls === 3 ? '' : <button onClick={roll}>Roll again</button>

    return (
        <div className='dice'>
          {dice.map(function (val, idx) {
            const cn = classNames(
              'die-container',
              {isHeld: _.contains(heldDice, idx)}
            )
            return (
              <div className={cn} key={idx}>
                <Die
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
Dice.propTypes = {
  dice: React.PropTypes.array,
  roll: React.PropTypes.number,
  rolls: React.PropTypes.number,
  hold: React.PropTypes.array,
  heldDice: React.PropTypes.array
}

class Tally {

  getNumberDisplay (key, scoring, isNewTurn, scoreMarkers) {
    let numDisplay = null
    if (scoring[key] === null) {
      if (isNewTurn) {
        numDisplay = '-'
      } else {
        numDisplay = <button onClick={scoreMarkers['score_' + key]}>Score</button>
      }
    } else {
      numDisplay = scoring[key]
    }
    return numDisplay
  }

  render () {
    const { scoring, scoreMarkers, isNewTurn } = this.props
    return (
      <div>

        <h2>UPPER SECTION</h2>
        <table>
          <tbody>
            <tr>
              <td>Aces = 1</td><td>Count and Add Only Aces</td><td>{this.getNumberDisplay('ones', scoring, isNewTurn, scoreMarkers)}</td>
            </tr>
            <tr>
              <td>Twos = 2</td><td>Count and Add Only Twos</td><td>{this.getNumberDisplay('twos', scoring, isNewTurn, scoreMarkers)}</td>
            </tr>
            <tr>
              <td>Threes = 3</td><td>Count and Add Only Threes</td><td>{this.getNumberDisplay('threes', scoring, isNewTurn, scoreMarkers)}</td>
            </tr>
            <tr>
              <td>Fours = 4</td><td>Count and Add Only Fours</td><td>{this.getNumberDisplay('fours', scoring, isNewTurn, scoreMarkers)}</td>
            </tr>
            <tr>
              <td>Fives = 5</td><td>Count and Add Only Fives</td><td>{this.getNumberDisplay('fives', scoring, isNewTurn, scoreMarkers)}</td>
            </tr>
            <tr>
              <td>Sixes = 6</td><td>Count and Add Only Sixes</td><td>{this.getNumberDisplay('sixes', scoring, isNewTurn, scoreMarkers)}</td>
            </tr>
          </tbody>
        </table>

        <h2>LOWER SECTION</h2>
        <table>
          <tbody>
            <tr>
              <td>3 of a kind</td><td>Add Total Of All Dice</td><td></td>
            </tr>
            <tr>
              <td>4 of a kind</td><td>Add Total Of All Dice</td><td></td>
            </tr>
            <tr>
              <td>Full House</td><td>SCORE 25</td><td></td>
            </tr>
            <tr>
              <td>Sm. Straight (sequence of 4)</td><td>SCORE 30</td><td></td>
            </tr>
            <tr>
              <td>Sm. Straight (sequence of 5)</td><td>SCORE 40</td><td></td>
            </tr>
            <tr>
              <td>REDUXEE</td><td>SCORE 50</td><td></td>
            </tr>
            <tr>
              <td>Chance</td><td>Score Total Of All 5 Dice</td><td></td>
            </tr>
          </tbody>
        </table>
    </div>
    )
  }
}
Tally.propTypes = {
  isNewTurn: React.PropTypes.bool,
  scoreMarkers: React.PropTypes.object,
  scoring: React.PropTypes.object
}

@connect(state => state)
export class GameBoard {
  render () {
    const {
      dice,
      dispatch,
      rolls,
      score,
      scoring,
      isNewTurn,
      heldDice
    } = this.props
    const {
      roll,
      hold,
      reset
    } = bindActionCreators(actions, dispatch)
    let gameContent = null

    if (!dice.length) {
      if (!score) {
        gameContent = <div className='dice'><button onClick={roll}>Start Game</button></div>
      } else {
        gameContent = <div className='dice'><button onClick={roll}>Roll next turn</button></div>
      }
    } else {
      gameContent = <Dice dice={dice} roll={roll} rolls={rolls} hold={hold} heldDice={heldDice}/>
    }

    return (
      <div className='Grid' id='main'>
        <button onClick={reset}>Start Over</button>
        <div className='Grid-cell play-column'>
          {gameContent}
        </div>
        <div className='Grid-cell Grid--1of3'>
          <div id='score'>Score: {score}</div>
          <Tally scoring={scoring} scoreMarkers={bindActionCreators(actions, dispatch)} isNewTurn={isNewTurn}/>
        </div>
      </div>
    )
  }
}
GameBoard.propTypes = {
  number: React.PropTypes.number,
  dice: React.PropTypes.array,
  rolls: React.PropTypes.number,
  score: React.PropTypes.number,
  scoring: React.PropTypes.object,
  dispatch: React.PropTypes.function,
  isNewTurn: React.PropTypes.bool,
  heldDice: React.PropTypes.array
}
