import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { togglePanel, closePanel } from '../reducers/panel'
import { Plus, Hamburger } from '../svgs/icons'
import './styles/header.scss'

class Header extends Component {
	render() {
		const { real_name, authenticated } = this.props.currentUser
		const { title = ''} = this.props.view
		const { panel, panel_content } = this.props.panel
		const { togglePanel } = this.props
		
		const LoggedIn = () => (
			<div className="header-user">
				<nav 
					className="edit" 
					onClick={ () => togglePanel('addentry') } >
					{ panel_content !== 'nav'   && <Plus  />}
				</nav>
				
				{ real_name && <p>Hi, { real_name }</p> }
			</div>
		)

		const Nav = () => (
			<nav
				className="nav"
				onClick={() => this.props.togglePanel('nav')} >
				{ !panel && <Hamburger  /> }
				{ panel && panel_content === 'nav' && <Plus  /> }
			</nav>
		)

		return (
			<header>
				<Nav />
				<div>
					<div className="logo" onClick={() => this.props.closePanel()}>
						<Link to='/'>lstry</Link>
					</div>
					<h1>{ title }</h1>
				</div>
				{ authenticated && <LoggedIn /> }
				{ !authenticated && <a href="/auth/slack" className="login">LogIn</a> }
      		</header>
		)
	}
}

export default connect(
	(state) => ({browser: state.browser, mainData: state.mainData, currentUser: state.currentUser, view: state.view, panel: state.panel }),
	{ togglePanel, closePanel }
)(Header)
