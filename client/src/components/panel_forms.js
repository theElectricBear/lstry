import React from 'react'
import Arrow from '../svgs/dropdownarrow.svg'


const selectStyle = {
	backgroundImage: `url(${Arrow})`,
}

export const NewListForm = () => (
	<form onSubmit={ () => alert('submit')} >
		<input type="text" name="" value="" />
		<input type="text" name="" value="" />
		<select name="list" >
			<option value="volvo">Volvo</option>
			<option value="saab">Saab</option>
			<option value="opel">Opel</option>
			<option value="audi">Audi</option>
		</select>
	</form>
)

export const AddEntryForm = (props) => {
	const { currentUser, handleSubmit, handleInputChange } = props
	const { url, itemId } = props.editor
	return(
		<aside>
			<h2>Create entry</h2>
			<form onSubmit={ (e) => handleSubmit(e) } >
				<input 
					type="text"
					name="url"
					value={ url }
					onChange={ handleInputChange } 
					placeholder='https://...'/>
				<select
					name="itemId"
					value={ itemId }
					onChange={ handleInputChange }
					style={ selectStyle } >
						<option value="" disabled >Select a list</option>
						{currentUser.lists.map((list) => <option key={ list.id } value={ list.id }>{ list.title }</option>)}
				</select>
				<button type="submit">SUBMIT</button>
			</form>
		</aside>
	)
}

export const UpdateEntryForm = (props) => {
	const { currentUser, handleSubmit, handleInputChange } = props
	const { title, newListId } = props.editor
	return(
		<aside >
			<h2>Modify entry</h2>
			<form onSubmit={ (e) => handleSubmit(e) } >
				<input 
					type="text"
					name="title"
					value={ title }
					onChange={ handleInputChange } />
				<select 
					name="newListId"
					value={ newListId }
					onChange={ handleInputChange }
					style={ selectStyle } >
						{currentUser.lists.map((list) => <option key={ list.id } value={ list.id }>{ list.title }</option>)}
				</select>
				<button type="submit">SUBMIT</button>
			</form>
		</aside>
	)
}

export const ConfirmOption = ({ query, handleSubmit, closePanel }) => { 
	return(
		<aside>
			<h2>{ query }</h2>
			<button onClick={ (e) =>  handleSubmit(e)} >Yes</button>
			<button onClick={ () => closePanel() } >No</button>
		</aside>
	)
}