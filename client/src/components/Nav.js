import React, { Component } from 'react';
import { connect } from 'react-redux'
import { closePanel } from '../reducers/panel'
import { Link } from 'react-router-dom'

class Nav extends Component {
	render() {
		const { authenticated } = this.props.currentUser
		return (
			<nav key='nav-main' id="nav-main" className="sidebar nav-main">
				<ul>
					<li onClick={() => this.props.closePanel()} >
						<Link to='/'>Home</Link>
					</li>
					<li onClick={() => this.props.closePanel()} >
						<Link to='/users'>Users</Link>
					</li>
					<li onClick={() => this.props.closePanel()} >
						<Link to='/lists'>Lists</Link>
					</li>
					<li onClick={() => this.props.closePanel()} >
						<Link to='/lists'>Links</Link>
					</li>
				</ul>
				{ authenticated &&
				<ul>
					<li onClick={() => this.props.closePanel()} >
						<Link to='/your/dashboard'>Your Dashboard</Link>
					</li>
					<li onClick={() => this.props.closePanel()} >
						<Link to='/your/lists'>Your Lists</Link>
					</li>
					<li onClick={() => this.props.closePanel()} >
						<Link to='/your/shared'>Your Shared</Link>
					</li>
					<li onClick={() => this.props.closePanel()} >
						<Link to='/your/followed'>Your Followed</Link>
					</li>
					<li onClick={() => this.props.closePanel()} >
						<Link to='/your/public'>Your Public</Link>
					</li>
				</ul>
				}
				
			</nav>
		)
	}
}

export default connect(
	(state) => ({browser: state.browser, currentUser: state.currentUser }),
	{ closePanel }
)(Nav)
