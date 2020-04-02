import {
	GET_CIRCLE_EVENTS,
	GET_CIRCLE_EVENTS_FAIL,
	GET_CIRCLE_EVENTS_SUCCESS
} from "../actions/circle_ci";

const initialState = {
	events: [],
	loading: false,
	failed: false
};

export default (state = initialState, action) => {
	switch (action.type) {

		case GET_CIRCLE_EVENTS:
			return {...state, loading: true, failed: false}
		case GET_CIRCLE_EVENTS_SUCCESS:
			return {...state, result: action.payload, loading: false}
		case GET_CIRCLE_EVENTS_FAIL:
			return {...state, result: action.payload, loading: false, failed: true}

		default:
			return state;
	}
}