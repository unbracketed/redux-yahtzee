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
    sixes: null,
    three_of_a_kind: null,
    four_of_a_kind: null
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
  return finishScoringState(state, key, scoreFor)
}

function finishScoringState (state, stat, points) {
  return {
    ...state,
    ...resetTurn(),
    scoring: {
      ...state.scoring,
      [stat]: points
    },
    score: state.score + points
  }
}

const countDiceByNumber = R.countBy(R.identity)

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

    case constants.SCORE_THREE_OF_A_KIND:
      // validate for 3 of a kind
      const diceByNum3 = countDiceByNumber(state.dice)
      const threeOrMore = R.head(R.filter(k => diceByNum3[k] >= 3, Object.keys(diceByNum3)))
      if (!threeOrMore) {
        console.log('cannot score')
        return state
      }
      // score all dice
      return finishScoringState(state, 'three_of_a_kind', R.sum(state.dice))

    case constants.SCORE_FOUR_OF_A_KIND:
      // validate for four of a kind
      const diceByNum4 = countDiceByNumber(state.dice)
      const fourOrMore = R.head(R.filter(k => diceByNum4[k] >= 4, Object.keys(diceByNum4)))
      if (!fourOrMore) {
        console.log('cannot score')
        return state
      }
      // score all dice
      return finishScoringState(state, 'four_of_a_kind', R.sum(state.dice))

    default:
      return state
  }

}
