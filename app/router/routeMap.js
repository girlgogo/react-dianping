import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from '../containers/index.jsx'
import Home from '../containers/Home/index.jsx'
import City from '../containers/City/index.jsx'
import Login from '../containers/Login/index.jsx'
import User from '../containers/User/index.jsx'
import Search from '../containers/Search/index.jsx'
import Detail from '../containers/Detail/index.jsx'
import NotFound from '../containers/404.jsx'

class RouterMap extends React.Component {
	render() {
    return (
      <Router history={this.props.history}>
        <Route path='/' component={App}>
          <IndexRoute component={Home}/>
          <Route path='/city' component={City}/>
          <Route path='/login(/:router)' component={Login}/>
          <Route path='/user' component={User}/>
          <Route path='/search/:type(/:keyword)' component={Search}/>
          <Route path='/detail/:id' component={Detail}/>
          <Route path='*' component={NotFound}/>
        </Route>
      </Router>
    )
  }
}

export default RouterMap
