export const GET_CIRCLE_EVENTS = "GET_CIRCLE_EVENTS";
export const GET_CIRCLE_EVENTS_SUCCESS = "GET_CIRCLE_EVENTS_SUCCESS";
export const GET_CIRCLE_EVENTS_FAIL = "GET_CIRCLE_EVENTS_FAIL";

export const getCircleEvents = () => {
	return (dispatch, getState) => {

		dispatch({type: GET_CIRCLE_EVENTS})
		dispatch({type: GET_CIRCLE_EVENTS_SUCCESS})

	}
}