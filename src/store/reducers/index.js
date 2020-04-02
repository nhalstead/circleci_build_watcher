import {combineReducers} from "redux";

import circle_ci from './circle_ci';

const createReducer = (asyncReducers) =>
	combineReducers({
		circle_ci
	});

export default createReducer;
