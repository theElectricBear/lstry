import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createResponsiveStateReducer, responsiveStoreEnhancer } from 'redux-responsive'
import mainDataReducer from './reducers/main_data'
import currentUserReducer from './reducers/current_user'
import viewListsReducer from './reducers/view_lists'
import panelReducer from './reducers/panel'
// import linkEditorReducer from './reducers/link_editor'
import editorReducer from './reducers/editor'


const reducer = combineReducers ({
	browser: createResponsiveStateReducer({
		xs: 479,
		sm: 639,
		md: 767,
		lg: 1024,
		xl: 1199,
		xx: 1399,
	}),
	mainData: mainDataReducer,
	currentUser: currentUserReducer,
	view: viewListsReducer,
	panel: panelReducer,
	editor: editorReducer
})

export default createStore(
	reducer,
	composeWithDevTools(
		responsiveStoreEnhancer,
		applyMiddleware(thunk)
	)
)