import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setView } from '../../reducers/view_lists'
import { List } from '../../components/List'
import * as util from '../../lib/util'

export class Links extends Component {
	componentDidMount () {
		this.props.setView({ title: 'Links'})
	}
	render() {
        const { sites = [] } = this.props.mainData
        const revSites = util.reverse(sites)
		return (
			<div>
				<section className="list-container">
                    <h2>All Sites</h2>
					<List items = { revSites } />
				</section>
			</div>
		)
	}
}

export default withRouter( connect(
	(state) => ({browser: state.browser, mainData: state.mainData }),
	{ setView }
)(Links))