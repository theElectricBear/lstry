import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closePanel } from '../reducers/panel'
import { updateFormInfo } from '../reducers/editor'
import { handleEntries } from '../reducers/current_user'
import { default as Nav } from './Nav'
import { NewListForm, AddEntryForm, UpdateEntryForm, ConfirmOption } from './panel_forms'
import './styles/panel.scss'

class Panel extends Component {

	handleInputChange = (e) => {
		e.preventDefault()
		this.props.updateFormInfo({[e.target.name]: e.target.value})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { url, title, itemId, newListId } = this.props.editor
		const { listId } = this.props.view
		const { panel_content } = this.props.panel

		let args = { type: panel_content, title, itemId, listId, newListId, url }
		this.props.closePanel()
		this.props.handleEntries( args )
	}

	content = () => {
		const { panel_content } = this.props.panel
		switch(panel_content) {
			case 'nav':
				return <Nav />
			case 'addentry':
				return (
					<AddEntryForm 
						handleSubmit={ this.handleSubmit }
						handleInputChange={ this.handleInputChange }
						{ ...this.props } />
				)
			case 'updatelink':
				return (
					<UpdateEntryForm
						handleSubmit={ this.handleSubmit }
						handleInputChange={ this.handleInputChange }
						{ ...this.props } />
				)
			case 'newlist':
				return <NewListForm />
			case 'delete':
				return (
					<ConfirmOption
						query="Delete Entry?"
						handleSubmit={ this.handleSubmit }
						{ ...this.props } />
				)
			default:
			  return null
		  }
	}

	render() {
		const { panel_content } = this.props.panel
		return (
			<div className={ `panel ${ panel_content }` }>
				{ this.content() }
			</div>
		)
	}
}

export default connect(
	(state) => ({browser: state.browser, currentUser: state.currentUser, panel: state.panel, view: state.view, editor: state.editor }),
	{ closePanel, handleEntries, updateFormInfo }
)(Panel)