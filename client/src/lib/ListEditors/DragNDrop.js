const placeholder = document.createElement("li");
placeholder.className = "placeholder";

export function dragStart (e) {
	this.setPanel()
	this.setState({ dragged: e.currentTarget })
	if (e.target.className === 'placeholder' ) return;
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', this.state.dragged);
}

export function dragOver (e) {
	e.preventDefault();
	this.state.dragged.style.display = "none";
	if ( !e.target.parentNode.dataset.listkey || e.target === placeholder ) return;
	this.setState({ over: e.target })
	e.target.parentNode.insertBefore(placeholder, e.target);
}

export function dragEnd (e) {
	this.state.dragged.style.display = 'block';
	this.state.over.parentNode.removeChild(placeholder);

	// update state
	let user = this.props.user
	let lists = user.lists;
	let fromList = lists.find((list) => { return list.id === this.state.dragged.parentNode.dataset.listkey })
	let toList = lists.find((list) => { return list.id === this.state.over.parentNode.dataset.listkey })
	let fromIndex = Number(this.state.dragged.dataset.index);
	let toIndex = Number(this.state.over.dataset.index)

	if( fromList === toList && fromIndex < toIndex) toIndex--;
	toList.sites.splice(toIndex, 0, fromList.sites.splice(fromIndex, 1)[0]);
	fromList.sites.length <= 0 ? this.state.dragged.parentNode.className = 'empty' : this.state.dragged.parentNode.className = ''
	toList.sites.length <= 0 ? this.state.over.parentNode.className = 'empty' : this.state.over.parentNode.className = ''
	user.lists = lists

	Array.from([fromList, toList]).forEach((list) => {
		let edit = {
			list: {
				id: list.id,
				sites: list.sites
			}
		}
		this.props.update(edit)
	})
	this.setState({
		dragged: null,
		draggedOver: null
	});
}