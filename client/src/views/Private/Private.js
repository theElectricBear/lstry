import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setView } from '../../reducers/view_lists'
import ViewRender from './ViewRender'
import { recent, last } from '../../lib/util'

class setContent extends Component {
	setView () {
		const { view, list } = this.props.match.params
		const { lists = [] } = this.props.currentUser

		switch(view) {
			case 'lists':
				return (
					this.props.setView({
						title: 'Your Lists',
						color: 'orange',
						content: {
							lists: [ ...lists ]
						}
					})
				)
			case 'shared':
				return (
					this.props.setView({
						title: 'Your Shared',
						color: 'blue',
						content: {
							shared: [ ...lists ]
						}
					})
				)
			case 'followed':
				return (
					this.props.setView({
						title: 'Your Followed',
						color: 'green',
						content: {
							followed: [ ...lists ]
						}
					})
				)
			case 'public':
				return (
					this.props.setView({
						title: 'Your Public',
						color: 'pink',
						content: {
							publik: [ ...lists ]
						}
					})
				)
			case 'dashboard':
				return (
					this.props.setView({
						title: 'Your Dashboard',
						color: 'yellow',
						content: {
							lists: recent(lists, 5),
							shared: last(lists, 5),
							followed: recent(lists, 5),
							publik: [...lists]
						}
					})
				)
			default:
				const listContent = lists.find((x) => x.local_url.substring(5) === list) || {title: ''}
				return (
					this.props.setView({
						title: listContent.title,
						listId: listContent.id,
						color: 'orange',
						content: {
							links: listContent.sites
						}
					})
				)
		}
	}


	componentDidMount () {
		this.setView()
	}

	componentDidUpdate (prevProps) {
		if (
			prevProps.match.params.view !== this.props.match.params.view
			|| prevProps.currentUser !== this.props.currentUser
		)
			this.setView()
	}

	render() {
		return (
			<ViewRender { ...this.props }/>
		)
	}
}

export default connect(
	(state) => ({browser: state.browser, mainData: state.mainData, currentUser: state.currentUser, view: state.view }),
	{ setView }
)(setContent)
