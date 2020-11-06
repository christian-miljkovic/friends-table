import React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { FriendsTable } from './components/FriendsTable'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/table/:clientId" component={FriendsTable} />
          <Route exact path="/">
            <Redirect to="/table/123" />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default hot(App)
