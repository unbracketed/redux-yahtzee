import * as constants from './constants'

export function roll () {return {type: constants.ROLL_DICE}}
export function reset () {return {type: constants.RESET_GAME}}
export function hold () {return {type: constants.HOLD_DIE, index: arguments[0]}}
export function score_ones () {return {type: constants.SCORE_ONES}}
export function score_twos () {return {type: constants.SCORE_TWOS}}
export function score_threes () {return {type: constants.SCORE_THREES}}
export function score_fours () {return {type: constants.SCORE_FOURS}}
export function score_fives () {return {type: constants.SCORE_FIVES}}
export function score_sixes () {return {type: constants.SCORE_SIXES}}
export function score_three_of_a_kind () {return {type: constants.SCORE_THREE_OF_A_KIND}}
export function score_four_of_a_kind () {return {type: constants.SCORE_FOUR_OF_A_KIND}}
export function score_full_house () {return {type: constants.SCORE_FULL_HOUSE}}
export function score_small_run () {return {type: constants.SCORE_SMALL_RUN}}
export function score_large_run () {return {type: constants.SCORE_LARGE_RUN}}
