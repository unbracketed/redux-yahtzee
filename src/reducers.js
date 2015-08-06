import _ from 'lodash'
import R from 'ramda'
import * as constants from './constants'

const initialState = {
  score: 0,
  scoring: {
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null
  },
  heldDice: [],
  dice: [],
  rolls: 0,
  isNewTurn: true
}

function resetTurn () {
  return {
    heldDice: [],
    dice: [],
    rolls: 0,
    isNewTurn: true
  }
}

function scoreForNumber (state, key, num) {
  const sameNum = R.filter(n => n === num)
  const scoreFor = R.sum(sameNum(state.dice))
  return {
    ...state,
    ...resetTurn(),
    scoring: {
      ...state.scoring,
      [key]: scoreFor
    },
    score: state.score + scoreFor
  }
}


export default function game (state=initialState, action) {

  switch (action.type) {

    case constants.ROLL_DICE:

      const diceRange = R.range(0, 5)
      const getDice = R.map(i => R.contains(i, state.heldDice)
        ? state.dice[i]
        : _.random(1, 6))
      const rolls = state.rolls + 1

      return {
        ...state,
        rolls,
        isNewTurn: false,
        dice: getDice(diceRange),
        heldDice: rolls > 2 ? diceRange : state.heldDice
      }

    case constants.HOLD_DIE:
      // copy the array, for redux shallow compare
      let newHelds = state.heldDice.slice()
      if (R.contains(action.index, newHelds)) {
        // remove held die
        newHelds = R.filter(i => i !== action.index, newHelds)
      } else {
        // add to held dice
        newHelds.push(action.index)
      }
      return {
        ...state,
        heldDice: newHelds
      }

    case constants.RESET_GAME:
      return {
        ...resetTurn(),
        scoring: initialState.scoring,
        score: 0
      }

    case constants.SCORE_ONES:
      return scoreForNumber(state, 'ones', 1)

    case constants.SCORE_TWOS:
      return scoreForNumber(state, 'twos', 2)

    case constants.SCORE_THREES:
      return scoreForNumber(state, 'threes', 3)

    case constants.SCORE_FOURS:
      return scoreForNumber(state, 'fours', 4)

    case constants.SCORE_FIVES:
      return scoreForNumber(state, 'fives', 5)

    case constants.SCORE_SIXES:
      return scoreForNumber(state, 'sixes', 6)

    default:
      return state
  }

}
