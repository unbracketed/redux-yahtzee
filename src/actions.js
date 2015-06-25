import * as constants from './constants'

export function roll () {return {type: constants.ROLL_DICE}}
export function reset () {return {type: constants.RESET_GAME}}
export function score_ones () {return {type: constants.SCORE_ONES}}
