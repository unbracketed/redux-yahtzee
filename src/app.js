import React from 'react'
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as actions from './actions'
import  gameReducers from './stores';
import { GameBoard } from './components'


const redux = createRedux({game: gameReducers});
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
