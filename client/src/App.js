import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { fetchData } from './reducers/main_data'
import { fetchUser } from './reducers/current_user'
import { setView } from './reducers/view_lists'
import { Header, Footer, Routes } from './chrome'
import { Panel } from './components'
import "./App.scss"

const history = createHistory()
history.listen((location, action) => {
	//console.log(location.pathname)
});

class App extends Component {

	componentDidMount() {
		this.props.fetchData()
		this.props.fetchUser()
	}

	render() {
		const { panel } = this.props.panel
		const { color } = this.props.view
		return (
			<Router history={history}>
				<div className={ `site-wrapper ${ panel && "panel-active" } ${ color }` }>
					<div className='container'>
						<Header />
						<Routes />
						<Footer />
						{ panel && <Panel /> }
					</div>
				</div>
			</Router>
		)
	}

}

export default connect(
	(state) => ({ browser: state.browser, mainData: state.mainData, currentUser: state.currentUser, view: state.view, panel: state.panel }),
	{ fetchData, fetchUser, setView }
)(App)
