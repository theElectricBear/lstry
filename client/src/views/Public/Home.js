import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setView } from '../../reducers/view_lists'
import * as util from '../../lib/util'
import { List } from '../../components/List'


class Home extends Component {

	getRecent () {
		const { sites = [] } = this.props.mainData

		const getRecent = util.compose(util.last, util.reverse)
		const reduceRecent =  (arr, site, prop) => util.length(arr) < 5 ? util.pushUnique(arr, site[prop]) : arr
		
		const recentLinks = getRecent(sites, 5)
		const recentUsers = sites.reduceRight((acc, site) => reduceRecent(acc, site, 'user'), [])
		const recentLists = sites.reduceRight((acc, site) => reduceRecent(acc, site, 'channel'), [])

		let linksDetail = recentLinks || []
		let usersDetail = recentUsers ? 
			recentUsers.reduce( (acc, item) => {
				let user = this.props.mainData['users'].find((current) => current.id === item )
				return [ ...acc, user ]
			}, []
		) : []

		let listsDetail = recentLists ?
			recentLists.reduce( (acc, item) => {
				let list = this.props.mainData['channels'].find((current) => current.id === item )
				return [ ...acc, list ]
			}, []
		) : []

		this.props.setView({ 
            title: 'Recent Activity',
			color: 'pink',
			content: {
				links: linksDetail,
				lists: listsDetail,
				users: usersDetail
			}
		})
	}

	componentDidMount () {
			this.getRecent()
	}

	componentDidUpdate (prevProps) {
		if (prevProps.mainData !== this.props.mainData)
			this.getRecent()
	}
	
	render() {
		const { users = [], lists = [], links = [] } = this.props.view.content
			
		return (
			<div>
				<section className="list-container">
					
					<h2><Link to='users'>Users</Link></h2>
					<List items={ users } /> 
					<Link to="/users" className="full-link">Full List...</Link>
				</section>
				<section className="list-container">
					<h2><Link to='lists'>Lists</Link></h2>
					<List items={ lists  } />
					<Link to="/lists" className="full-link">Full List...</Link>
				</section>
				<section className="list-container">
					<h2><Link to='links'>Links</Link></h2>
					<List items={ links  } />
					<Link to="/links" className="full-link">Full List...</Link>
				</section>
			</div>
		)
	}
}

export default connect(
	(state) => ({browser: state.browser, mainData: state.mainData, view: state.view }),
	{ setView }
)(Home)
