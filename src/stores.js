import _ from 'lodash'
import * as constants from './constants'

const initialState = {
  score: 0,
  heldDice: [],
  dice: [1, 2, 3, 4, 5, 6]
}


export default function game (state=initialState, action) {
  switch (action.type) {

    case constants.ROLL_DICE:

      // TODO roll dice except held dice
      const dice = _.map(_.range(6), () => _.random(1,6))
      // reset held dice
      return {
        ...state,
        heldDice: [],
        dice
      }

    default:
      console.log('default case', state);
      return state
  }

}
