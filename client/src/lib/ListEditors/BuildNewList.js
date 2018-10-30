export function buildNewList (edit) {
	let list = {
		sites: [],
		date_created: new Date(),
		date_updated: new Date()
	}

	return { ...edit, ...list }
}