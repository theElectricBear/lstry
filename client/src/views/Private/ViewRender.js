import React, { Component } from 'react'
import { connect } from 'react-redux'
import { togglePanel } from '../../reducers/panel'
import { updateFormInfo } from '../../reducers/editor'
import { renderDashboard, renderLists, renderShared, renderFollowed, renderPublic, renderList  } from './content_views'

class ViewRender extends Component {

	viewRender = () => {
        const { view } = this.props.match.params
		const { content = {} } = this.props.view
		switch(view) {
			case 'dashboard':
				return renderDashboard( content )
			case 'lists':
				return renderLists( content )
			case 'shared':
				return renderShared( content )
			case 'followed':
				return renderFollowed( content )
            case 'public':
				return renderPublic( content )
			default:
				return renderList( content, this.setEdit )
		}
	}
	
	setEdit = ( item, type ) => {
		const { togglePanel, updateFormInfo } = this.props
		const { listId } = this.props.view
		updateFormInfo({ title: item.title, itemId: item.id, newListId: listId })
        togglePanel(type)
    }

	componentDidUpdate (prevProps) {
        if (prevProps.view.content !== this.props.view.content)
        this.render()
	}

	render() {
		return (    
            <div>
			    { this.viewRender() }
			</div>
		)
	}
}

export default connect(
	(state) => ({browser: state.browser, view: state.view, panel: state.panel, editor: state.editor }),
	{ togglePanel, updateFormInfo  }
)(ViewRender)
