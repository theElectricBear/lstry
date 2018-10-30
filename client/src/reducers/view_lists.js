const initState = {
	content: {}
}

const SET_VIEW = 'SET_VIEW'

export const setView = (data) => ( { type: SET_VIEW, payload: data } )


export default (state = initState, action) => {
	switch (action.type) {
		case SET_VIEW:
			return { ...initState, ...action.payload }
		default:
			return state;
	}
}
