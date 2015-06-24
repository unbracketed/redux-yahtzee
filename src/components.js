import React, {Component} from 'react'

export default class Dice extends Component {
  render() {
    //const {dice} = this.props
    let dice = []
    return (
      <div>
        {dice.map((val, idx) => <div key={idx}>{val}</div>)}
      </div>
    )
  }
}
