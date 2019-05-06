/**
 * Hovedkomponent for applikasjonens ruter.
 * Ser på websidens URL og bestemmer hvilke
 * komponenter som skal vises basert på den.
 */

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Game from './Game'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:id" exact component={Game} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
