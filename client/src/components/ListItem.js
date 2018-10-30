import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class ListItem extends Component {

	LinkType(props) {
			const urlPrefix = 'http'
			let hrefPrefix = props.href.substring(0, 4)
			if (hrefPrefix === urlPrefix) {
				return <a href={ props.href } target="_blank" rel="noopener noreferrer" > { props.text } </a>
			} else {
				return <Link to={ props.href } > { props.text } </Link>
			}
	}

	render() {

		return (
			<li className="entry site">
				{ this.LinkType(this.props) }			
			</li>
		)
	}
}
