import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import { Home, Users, User, Lists, Links, Private } from '../views';

class Routes extends Component {
  render() {
    const { authenticated } = this.props.currentUser
    return (
    	<main>
        <Switch>
          { authenticated && <Route path='/your/:view(dashboard|lists|shared|followed|public)' component={ Private }/> }
          { authenticated && <Route path='/your/list/:list' component={ Private }/> }
          <Route path='/' exact component = { Home } />
          <Route path='/users' exact component={ Users }/>
          <Route path='/users/:name' component={ User }/>
          <Route path='/lists/' component={ Lists }/>
          <Route path='/links/' component={ Links }/>
          <Route component={ Home } />
        </Switch>
		</main>
    );
  }
}

export default withRouter( connect(
	(state) => ({ currentUser: state.currentUser }),
	{ }
)(Routes) )
