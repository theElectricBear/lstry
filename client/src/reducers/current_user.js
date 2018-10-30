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

const initState = {
    loading: true,
    authenticated: false
};
const REQUEST_USER = 'REQUEST_USER';
const RECEIVE_USER = 'RECEIVE_USER';
  
const requestUser = () => ({ type: REQUEST_USER });
export const receivedUser = user => ({ type: RECEIVE_USER, payload: user });
  
export function fetchUser() {
    return (dispatch) => {
        dispatch(requestUser());
        return fetch(`/auth/validate-user`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error),
            )
            .then((data) => {
                if( data.authenticated === false) return
                data.lists = buildListUrls(data.lists, 'list/')
                dispatch(receivedUser(data)) 
            });
    };
}

export function handleEntries( args ) {
    const { type } = args;
    let apiUrl = ''
    switch (type) {
        case 'addentry':
            apiUrl = `/api/entry/new/`;
            break;
        case 'updatelink':
            apiUrl = `/api/entry/update/`;
            break;
        case 'delete':
            apiUrl = `/api/entry/delete/`;
            break;
        default:
            apiUrl = 'BadRequest'
    }
    return (dispatch) => {
        console.log(args)
        console.log(apiUrl)
        dispatch(requestUser());
        return fetch( apiUrl, {
            method: 'POST',
            body: JSON.stringify( args ),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error),
            )
            .then((data) => {
                if( data.authenticated === false) return
                data.lists = buildListUrls(data.lists, 'list/')
                dispatch(receivedUser(data))
            });
          
    };
}

export default (state = initState, action) => {
    switch (action.type) {
        case REQUEST_USER:
            return { ...state, loading: true };
        case RECEIVE_USER:
            return { ...initState, ...action.payload, loading: false };
        default:
            return state;
    }
};