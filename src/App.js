import React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { FriendsTable } from './screens/FriendsTable'
import { FriendForm } from './screens/FriendForm'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/table/:clientId" component={FriendsTable} />
          <Route path="/:clientId/friend/form/:friendId" component={FriendForm} />
          <Route exact path="/">
            <Redirect to="/table/123" />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default hot(App)
