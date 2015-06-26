import _ from 'lodash'
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

function resetTurn() {
  return {
    heldDice: [],
    dice: [],
    rolls: 0,
    isNewTurn: true
  }
}

function scoreForNumber (state, key, num) {
  const scoreFor = _.sum(_.filter(state.dice, n => n === num))
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


//TODO hold dice

export default function game (state=initialState, action) {

  switch (action.type) {

    case constants.ROLL_DICE:
      // TODO roll dice except held dice
      const dice = _.map(_.range(5), () => _.random(1,6))

      return {
        ...state,
        heldDice: [],
        rolls: state.rolls + 1,
        isNewTurn: false,
        dice
      }

    case constants.HOLD_DIE:
      console.log('HOLD_DIE', action, state)
      let newHelds = state.heldDice.slice()
      newHelds.push(action.index)
      console.log('held', newHelds)
      //TODO unhold
      return {
        ...state,
        heldDice: newHelds
      }

    case constants.RESET_GAME:
      return {
        ...resetTurn(),
        scoring: initialState.scoring,
        score: 0,
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
