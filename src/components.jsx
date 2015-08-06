import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import R from 'ramda'
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
  onClick: React.PropTypes.func,
  number: React.PropTypes.number
}

class Dice {
  render () {
    const {
      dice,
      roll,
      rolls,
      hold,
      heldDice
    } = this.props
    const heldCheck = R.contains(R.__, heldDice)

    return (
        <div className='dice'>
          {dice.map(function (val, idx) {
            const cn = classNames(
              'die-container',
              {isHeld: heldCheck(idx)}
            )
            return (
              <div className={cn} key={idx}>
                <Die
                  number={val}
                  onClick={hold.bind(null, idx)}/>
              </div>
            )
          })}
          {rolls !== 3 && <button onClick={roll}>Roll again</button>}
        </div>
    )
  }
}
Dice.propTypes = {
  dice: React.PropTypes.array,
  roll: React.PropTypes.func,
  rolls: React.PropTypes.number,
  hold: React.PropTypes.func,
  heldDice: React.PropTypes.array
}

class Tally {

  getNumberDisplay (scoring, isNewTurn, scoreMarkers, key) {
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
    const {
      scoring,
      scoreMarkers,
      isNewTurn
    } = this.props
    const getNumDisplay = R.curry(this.getNumberDisplay)(scoring, isNewTurn, scoreMarkers)

    return (
      <div>

        <h2>UPPER SECTION</h2>
        <table>
          <tbody>
            <tr>
              <td>Aces = 1</td><td>Count and Add Only Aces</td><td>{getNumDisplay('ones')}</td>
            </tr>
            <tr>
              <td>Twos = 2</td><td>Count and Add Only Twos</td><td>{getNumDisplay('twos')}</td>
            </tr>
            <tr>
              <td>Threes = 3</td><td>Count and Add Only Threes</td><td>{getNumDisplay('threes')}</td>
            </tr>
            <tr>
              <td>Fours = 4</td><td>Count and Add Only Fours</td><td>{getNumDisplay('fours')}</td>
            </tr>
            <tr>
              <td>Fives = 5</td><td>Count and Add Only Fives</td><td>{getNumDisplay('fives')}</td>
            </tr>
            <tr>
              <td>Sixes = 6</td><td>Count and Add Only Sixes</td><td>{getNumDisplay('sixes')}</td>
            </tr>
          </tbody>
        </table>

        <h2>LOWER SECTION</h2>
        <table>
          <tbody>
            <tr>
              <td>3 of a kind</td><td>Add Total Of All Dice</td><td>{getNumDisplay('three_of_a_kind')}</td>
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

    return (
      <div className='Grid' id='main'>
        <button onClick={reset}>Start Over</button>
        <div className='Grid-cell play-column'>
          {dice.length
            ? <Dice {...{dice, roll, rolls, hold, heldDice}}/>
            : <div className='dice'><button onClick={roll}>{!score ? 'Start Game' : 'Roll next turn'}</button></div>
          }
        </div>
        <div className='Grid-cell Grid--1of3'>
          <div id='score'>Score: {score}</div>
          <Tally scoreMarkers={bindActionCreators(actions, dispatch)} {...{scoring, isNewTurn}}/>
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
  dispatch: React.PropTypes.func,
  isNewTurn: React.PropTypes.bool,
  heldDice: React.PropTypes.array
}
