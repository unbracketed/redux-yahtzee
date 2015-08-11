import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import R from 'ramda'
import * as actionCreators from './actions'
import './styles/main.styl'
import './styles/dice.css'
import './styles/grid.css'

class Die {

  static propTypes = {
    onClick: React.PropTypes.func,
    number: React.PropTypes.number
  }

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

@connect(
  state => ({
    dice: state.dice,
    rolls: state.rolls,
    heldDice: state.heldDice
  }),
  dispatch => {
    const {
      roll,
      hold
    } = actionCreators
    const boundHolds = [0, 1, 2, 3, 4].map(i => ['hold' + i, hold.bind(null, i)])
    return {
      actions: {
        ...bindActionCreators(R.fromPairs(boundHolds), dispatch),
        ...bindActionCreators({roll}, dispatch)
      }
    }
  }
)
class Dice {

  static propTypes = {
    dice: React.PropTypes.array,
    rolls: React.PropTypes.number,
    heldDice: React.PropTypes.array,
    actions: React.PropTypes.object
  }

  render () {
    const {
      dice,
      actions,
      rolls,
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
                  onClick={actions['hold' + idx]}/>
              </div>
            )
          })}
          {rolls !== 3 && <button onClick={actions.roll}>Roll again</button>}
        </div>
    )
  }
}

class Tally {

  static propTypes = {
    isNewTurn: React.PropTypes.bool,
    scoreMarkers: React.PropTypes.object,
    scoring: React.PropTypes.object
  }

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
              <td>4 of a kind</td><td>Add Total Of All Dice</td><td>{getNumDisplay('four_of_a_kind')}</td>
            </tr>
            <tr>
              <td>Full House</td><td>SCORE 25</td><td>{getNumDisplay('full_house')}</td>
            </tr>
            <tr>
              <td>Sm. Straight (sequence of 4)</td><td>SCORE 30</td><td>{getNumDisplay('small_run')}</td>
            </tr>
            <tr>
              <td>Lg. Straight (sequence of 5)</td><td>SCORE 40</td><td>{getNumDisplay('large_run')}</td>
            </tr>
            <tr>
              <td>REDUXEE</td><td>SCORE 50</td><td>{getNumDisplay('reduxee')}</td>
            </tr>
            <tr>
              <td>Chance</td><td>Score Total Of All 5 Dice</td><td>{getNumDisplay('chance')}</td>
            </tr>
          </tbody>
        </table>
    </div>
    )
  }
}

@connect(state => state)
export class GameBoard {

  static propTypes = {
    number: React.PropTypes.number,
    dice: React.PropTypes.array,
    rolls: React.PropTypes.number,
    score: React.PropTypes.number,
    scoring: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    isNewTurn: React.PropTypes.bool,
    heldDice: React.PropTypes.array
  }

  render () {
    const {
      dice,
      dispatch,
      score,
      scoring,
      isNewTurn
    } = this.props
    const {
      roll,
      reset
    } = bindActionCreators(actionCreators, dispatch)

    return (
      <div className='Grid' id='main'>
        <button onClick={reset}>Start Over</button>
        <div className='Grid-cell play-column'>
          {dice.length
            ? <Dice/>
            : <div className='dice'><button onClick={roll}>{!score ? 'Start Game' : 'Roll next turn'}</button></div>
          }
        </div>
        <div className='Grid-cell Grid--1of3'>
          <div id='score'>Score: {score}</div>
          <Tally scoreMarkers={bindActionCreators(actionCreators, dispatch)} {...{scoring, isNewTurn}}/>
        </div>
      </div>
    )
  }
}
