import React from 'react'
import { createRedux } from 'redux'
import { Provider } from 'redux/react'
import gameReducers from './stores'
import { GameBoard } from './components'

const redux = createRedux({game: gameReducers})

class GameApp {
  render () {
    return (
      <Provider redux={redux}>
        {() => <GameBoard/>}
      </Provider>
    )
  }
}

React.render(<GameApp/>, document.body)
