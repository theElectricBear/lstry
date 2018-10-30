import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setView } from '../../reducers/view_lists'
// import { List } from '../../components/lists'

export class Lists extends Component {
	componentDidMount () {
		this.props.setView({ title: 'Lists'})
	}
	render() {
		return (
			<div>
				<section className="list-container">
					ToDo Later...
				</section>
			</div>
		)
	}
}

export default withRouter( connect(
	(state) => ({browser: state.browser, mainData: state.mainData }),
	{ setView }
)(Lists))
