import _ from 'lodash'
import * as constants from './constants'


const initialState = {
  score: 0,
  scoring: {
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0
  },
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
//TODO hold dice

export default function game (state=initialState, action) {
  switch (action.type) {

    case constants.ROLL_DICE:
      // TODO roll dice except held dice
      const dice = _.map(_.range(5), () => _.random(1,5))

      return {
        ...state,
        heldDice: [],
        rolls: state.rolls + 1,
        dice
      }

    case constants.RESET_GAME:
      return {
        ...resetTurn(),
        scoring: initialState.scoring,
        score: 0,
      }

    case constants.SCORE_ONES:
      const scoreFor = _.sum(_.filter(state.dice, n => n === 1))
      return {
        ...state,
        ...resetTurn(),
        scoring: {
          ...state.scoring,
          ones: scoreFor
        },
        score: state.score + scoreFor
      }

    default:
      return state
  }

}
