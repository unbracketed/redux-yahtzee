import React from 'react'
import { connect } from 'redux/react'


class Dice {
  render() {
    const { dice } = this.props
    return (
      <div>
        Dice goes here
        {dice.map((val, idx) => <div key={idx}>{val}</div>)}
      </div>
    )
  }
}


@connect(state => ({
  dice: state.game.dice
}))
export class GameBoard {
  render() {
    return <Dice dice={this.props.dice}/>
  }
}
