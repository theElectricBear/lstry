import * as util from '../lib/util'

const replaceWs = (x) => x.replace(/\s/g, '-')
const lowerCase = (x) => x.toLowerCase()
const addPath = (x, path) => path +  x
const buildUrl = util.compose( addPath, lowerCase, replaceWs)

const buildListUrls = (list, path) => {
	return Object.keys(list).map((key) => {
		const urlBase = list[key].real_name || list[key].name || list[key].title
		return { ...list[key], local_url: buildUrl( urlBase, path ) }
	})
}

const buildUserUrls = (user) => {
		user.local_url = buildUrl( ( user.real_name || user.name ), '/users/' )
		return {...user, lists: buildListUrls(user.lists, 'list/') }
}

const initState = {
	loading: true
};

const REQUEST_DATA = 'REQUEST_DATA';
const RECEIVE_DATA = 'RECEIVE_DATA';

export const requestData = () => ({ type: REQUEST_DATA });
export const receivedData = json => ({ type: RECEIVE_DATA, payload: json });

export function fetchData() {
	return function (dispatch) {
	  dispatch(requestData());
	  return fetch(`/api/data`)
		.then(
			response => response.json(),
			error => console.log('An error occurred.', error),
		)
		.then((data) => { 
			data = { 
				channels: buildListUrls(data[2], '/channels/'), 
				users: data[1].map( ( user ) => buildUserUrls(user) ), 
				sites: data[0] 
			} 
			dispatch(receivedData(data)) 
		});
	};
}

export default (state = initState, action) => {
	switch (action.type) {
		case REQUEST_DATA:
			return { ...state, loading: true };
		case RECEIVE_DATA:
			return { ...initState, ...action.payload, loading: false, currentUser: state.currentUser };
		default:
			return state;
	}
};
