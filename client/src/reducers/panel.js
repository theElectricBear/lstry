const initState = {
	panel: false,
	panel_content: false
};

const TOGGLE_PANEL = 'TOGGLE_PANEL';
const CLOSE_PANEL = 'CLOSE_PANEL';

export const togglePanel = (data) => ( { type: TOGGLE_PANEL, payload: data } )
export const closePanel = () => ( { type: CLOSE_PANEL } )


export default (state = initState, action) => {
	switch (action.type) {
		case TOGGLE_PANEL:
			return { ...state, panel: !state.panel, panel_content: state.panel ? false : action.payload }
		case CLOSE_PANEL:
			return { ...state, panel: false, panel_content: false }
		default:
			return state;
	}
};
