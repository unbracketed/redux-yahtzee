import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import game from './stores'
import { GameBoard } from './components'

const store = createStore(game)

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
