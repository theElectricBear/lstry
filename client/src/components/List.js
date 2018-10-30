import React, { Component } from 'react';
import { ListItem } from './ListItem';

export class List extends Component {
	render() {
		const { items = [] } = this.props
		let displayItems = items.map(item => {
			return item ? (
				<ListItem 
					href={ item.url || item.local_url || '' }
					text={ item.title || item.real_name || item.name }
					uniqueID={ item.id || item['_id'] }
					key={ item.id || item['_id'] } />
			) : null
		})
		return (
			<div>
				<ul className="items">
					{ ( !items[0] ) ? (
						<li className="placeholder">Empty</li>
					) : (
						displayItems
					)}
				</ul>
			</div>
		)
	}
}