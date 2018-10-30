import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from '../../components/List'
import { setView } from '../../reducers/view_lists'
import * as util from '../../lib/util'

class User extends Component {

	setUser () {
		const { users = [], sites = [] } = this.props.mainData
		let user = users.find(
			(user) => { return user.local_url === this.props.location.pathname }
		) || {}
		let title = user.real_name ? user.real_name + '\'s Lists' : ''
		if (user.lists) user.lists = user.lists.map((list) => {
			return {...list, sites: list.sites.reduce((acc, link, index) => {
				return [...acc, sites.find((site) => site.id === link)]
			}, [])}
			
		})

		this.props.setView({ title: title, color: 'green', user: user})
	}
	componentDidMount () {
		this.setUser()
	}

	componentDidUpdate (prevProps) {
		if (prevProps.mainData !== this.props.mainData)
			this.setUser()
	}

	render () {
		const { user = []  } = this.props.view
		const getRecent = util.compose(util.last, util.reverse)
		

		let listSections = user.lists ? user.lists.map((list) => {
			const recentLinks = getRecent( list.sites, 5)
			return (
				<section key = { list.id } className="list-container">
					<h2>
						{ list.title }
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

export default connect(
	(state) => ({ browser: state.browser, mainData: state.mainData, view: state.view }),
	{ setView }
)(User)
// export class User extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			edit: false,
// 			edits: { lists: [], sites: [], new: [], delete: [] },
// 			user: props.data.users.find((user) => { return user.local_url === props.location.pathname }),
// 			data: props.data,

// 		}

// 		this.namestyle = {
// 			display: 'inline-block'
// 		}
// 		// this.handleEdits = this.handleEdits.bind(this)
// 		this.toggleEdit = this.toggleEdit.bind(this)
// 		this.cancelEdit = this.cancelEdit.bind(this)
// 		this.update = this.update.bind(this)
// 	}

// 	componentWillReceiveProps(nextProps) {
// 		if (!this.state.user) {
// 			this.setState({
// 				user: nextProps.data.users.find((user) => { return user.local_url === nextProps.location.pathname }),
// 				data: nextProps.data
// 			})
// 		}
// 	}

// 	toggleEdit () {
// 		//pass edits log back up to Parent (Lyster)
// 		if (this.state.edit) {
// 			this.props.updateData( this.state.edits )
// 		}
// 		this.setState({
// 			edit: !this.state.edit,
// 			edits: { lists: [], sites: [], new: [], delete: [] }
// 		})
// 	}

// 	cancelEdit () {
// 		//pass edits log back up to Parent (Lyster)
// 		this.setState({
// 			edit: !this.state.edit,
// 			edits: { lists: [], sites: [], new: [], delete: [] },
// 			user: this.props.data.users.find((user) => { return user.local_url === this.props.location.pathname }),
// 			data: this.props.data
// 		})
// 	}

// 	async update (edit) {

// 		let data = this.state.data
// 		let user = this.state.user
// 		let edits = this.state.edits

// 		const findAndUpdate = (data, edit) => {
// 			return data.find((item, i) => {
// 				return item.id === edit.id ? data[i] = mergeObj( item, edit ) : false
// 			})
// 		}

// 		const buildNewList = (edit, sites = []) => {
// 			let newId = genId()
// 			edit.id = newId
// 			let props = {
// 				id: newId,
// 				sites: [ ...sites ],
// 				date_created: new Date(),
// 				date_updated: new Date()
// 			}
// 			return mergeObj(edit, props)
// 		}

// 		const addToData = ( data, newData ) => [ ...data, newData ]

// 		let newList =  partial(buildNewList, edit.list)

// 		let addToLists = partial(addToData, user.lists)

// 		let addToSites = partial(addToData, data.sites)

// 		let addNewToLists = pipe(newList, addToLists)



// 		const getNewAndUpdate = async (url) => {
// 			await getNewSite(url)
// 			.then((newsite) => {
// 				console.log(edit)
// 				data.sites = addToSites( newsite )

// 				user.lists.find((list, i) => {
// 					return list.id === edit.list.id ? user.lists[i].sites = [...list.sites, newsite.id] : false
// 				})

// 				if (!edits.sites.some( (entry) => entry === newsite.id )) edits.sites.push(newsite)
// 				edits.lists = user.lists

// 			})
// 		}


// 		if ( edit.list ) {
// 			if (edit.list.title === '') delete edit.list.title
// 			if ( !findAndUpdate(user.lists, edit.list) ) user.lists = addNewToLists()
// 			edits.lists = user.lists
// 		}

// 		if ( edit.site ) {
// 			if ( !findAndUpdate(data.sites, edit.site) ) await getNewAndUpdate(edit.site.url)
// 		}

// 		if ( edit.delete ) {
// 			user.lists.forEach( list => {
// 				list.sites = list.sites.filter(e => e !== edit.delete.id)
// 			})
// 			edits.delete = [...edits.delete, edit.delete.id]
// 			edits.lists = user.lists
// 		}

// 		this.setState({
// 			data: data,
// 			user: user,
// 			edits: edits,
// 		})
// 	}

// 	bundleSites (sites) {
// 		return sites.map((site, i) => {
// 			return getItem(this.props.data.sites, 'id', site)
// 		})
// 	}

// 	renderLists (lists) {
// 		return lists.map((list, i) => {
// 			return (
// 				<section key = { list.id } className = "list-container">
// 					<h2> { list.title } </h2>
// 					<List
// 						title = { list.title }
// 						sites = { this.bundleSites(list.sites) } />
// 				</section>
// 			)
// 		});
// 	}

// 	renderEditable () {
// 		return (
// 			<UserEdit
// 				data = { this.state.data }
// 				user = { this.state.user }
// 				edits = { this.state.edits }
// 				update = { this.update }/>
// 		)
// 	}

// 	renderLoggedIn () {
// 		return (
// 			<div>
// 				<div>
// 					<h2>Lyst User:</h2>
// 					<h1 style={ this.namestyle }>{this.state.user.real_name}</h1>
// 					<h3>&mdash; You are Logged In</h3>
// 					<span onClick = { this.toggleEdit } className="edit-toggle" >
// 						{ this.state.edit ? '<-Save Edits' : 'Edit Mode->' }
// 					</span>
// 					{ this.state.edit && <span onClick = { this.cancelEdit } className="edit-toggle" >Cancel Edits</span> }
// 				</div>

// 				{this.state.edit ? (
// 					this.renderEditable()
// 				) : (
// 					this.renderLists(this.state.user.lists)
// 				)}

// 			</div>
// 		)
// 	}

// 	render(props) {
// 		if ( !this.state.user ) { return <div>Loading User...</div> }

// 		if( this.props.currentUser && this.props.currentUser.display_name === this.state.user.real_name) return this.renderLoggedIn()

// 		return (
// 			<div>
// 				<div>
// 					<h2>Lyst User:</h2>
// 					<h1>{this.state.user.real_name}</h1>
// 				</div>
// 				{ this.renderLists(this.state.user.lists) }
// 			</div>
// 		)
// 	}
// }
