import React, { Component } from 'react'
import { connect } from 'redux/react'


export class Dice {
  render() {
    const {dice} = this.props
    console.log('Dice', this.props);
    return (
      <div>
      Dice goes here
        {dice.map((val, idx) => <div key={idx}>{val}</div>)}
      </div>
    )
  }
}


@connect(state => {console.log('connect', state); return {dice: state.default.dice}})
export class GameBoard {
  render() {
    console.log('GB', this.props);
    return <Dice dice={this.props.dice}/>
  }
}
