import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'redux/react'
import gameReducers from './stores'
import { GameBoard } from './components'

const store = createStore({game: gameReducers})

class GameApp {
  render () {
    return (
      <Provider store={store}>
        {() => <GameBoard/>}
      </Provider>
    )
  }
}

React.render(<GameApp/>, document.body)
