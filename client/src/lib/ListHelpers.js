export const trimLists = (list) => {
	let newList = {}
	Object.keys(list).map((key, index) => {
		return newList[key] = trimList(list[key]);
	})
	return newList
}

export const trimList = (list, length) => {
	let newList = list.slice(1).slice(-1 * length).reverse();
	return newList
}

export const getRecent = (list, length) => {
	let newList = list.slice(1).slice(-1 * length).reverse();
	return newList
}

export const getItem = (list, property, match) => {
	const isItem = u => u[property] === match
	return Array.from(list).find(isItem)
}
