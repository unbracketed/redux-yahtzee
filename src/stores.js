import _ from 'lodash'
import * as constants from './constants'

const initialState = {
  score: 0,
  heldDice: [],
  dice: [],
  rolls: 0
}

function resetTurn() {
  return {
    heldDice: [],
    dice: [],
    rolls: 0
  }
}

//TODO remove scoring button once used

export default function game (state=initialState, action) {
  switch (action.type) {

    case constants.ROLL_DICE:

      // TODO roll dice except held dice
      const dice = _.map(_.range(5), () => _.random(1,5))
      // reset held dice
      return {
        ...state,
        heldDice: [],
        rolls: state.rolls + 1,
        dice
      }

    case constants.RESET_GAME:
      return {
        ...resetTurn(),
        score: 0,
      }

    case constants.SCORE_ONES:
      return {
        ...state,
        ...resetTurn(),
        score: state.score + _.sum(_.filter(state.dice, n => n === 1))
      }

    default:
      return state
  }

}
