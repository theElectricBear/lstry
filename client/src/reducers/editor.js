const initState = {
	form: 'linkEdit',
    url: 'https://www.udemy.com/',
	itemId: '',
	title: 'test',
	newListId: '',
    visibility: true
}

export const FORM_INFO_UPDATE = 'FORM_INFO_UPDATE';
const RESET_FORM = 'RESET_FORM';

export const updateFormInfo = (field) => ({ type: FORM_INFO_UPDATE, payload: field });

export default (state = initState, action) => {
	switch (action.type) {
		case FORM_INFO_UPDATE:
			return {...state, ...action.payload }
		case RESET_FORM:
			return {...state, ...initState}
		default:
			return state
	}
}