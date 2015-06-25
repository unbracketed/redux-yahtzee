import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'redux/react';
import * as actions from './actions'
import { GameBoard } from './components'

import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import  * as stores from './stores';

console.log(stores);

const redux = createRedux(stores);
console.log('REDUX', redux);

redux.dispatch(actions.roll())

class GameApp {
  render() {
    return (
      <Provider redux={redux}>
        {() => <GameBoard/>}
      </Provider>
    )
  }
}

React.render(<GameApp/>, document.body)
