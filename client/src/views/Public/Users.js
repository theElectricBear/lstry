import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { setView } from '../../reducers/view_lists'
import { List } from '../../components/List'
import * as util from '../../lib/util'

class Users extends Component {
	setUsers () {
		const { users } = this.props.mainData
		this.props.setView({ title: 'Users', color:'pink', users: users})
	}

	componentDidMount () {
		this.setUsers()
	}

	componentDidUpdate (prevProps) {
		if (prevProps.mainData.users !== this.props.mainData.users)
			this.setUsers()
	}
	render () {
		const { users = [] } = this.props.view
		const getRecent = util.compose(util.last, util.reverse)
		
		let listSections = users ? users.map((user) => {
			const recentLinks = getRecent(user.lists, 5)
			return (
				<section key={user.id} className="list-container">
					<h2>
						<Link to={ user.local_url }> { user.real_name }:</Link>
					</h2>
					<List
						items={ recentLinks } />
				</section>
			)
		}) : null
		return (
			<div>
				{ listSections }
			</div>
		)
	}
}

export default withRouter( connect(
	(state) => ({ browser: state.browser, mainData: state.mainData, view: state.view }),
	{ setView } 
)(Users))