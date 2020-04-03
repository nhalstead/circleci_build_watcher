import _ from "lodash";
import moment from "moment";

export const GET_CIRCLE_EVENTS = "GET_CIRCLE_EVENTS";
export const GET_CIRCLE_EVENTS_SUCCESS = "GET_CIRCLE_EVENTS_SUCCESS";
export const GET_CIRCLE_EVENTS_FAIL = "GET_CIRCLE_EVENTS_FAIL";

export const getCircleEvents = () => {
	return (dispatch, getState) => {

		dispatch({type: GET_CIRCLE_EVENTS})
		dispatch({type: GET_CIRCLE_EVENTS_SUCCESS})

	}
}
export const getEventsFromConfig = (configs) => {
	return (dispatch, getState) => {

		dispatch({type: GET_CIRCLE_EVENTS});

		return Promise.all(configs.map(conf => {
			return fetch(`https://circleci.com/api/v1.1/organization/${conf.type}/${conf.org}?circle-token=${conf.token}&limit=4&shallow=true`)
				.then(response => {
					if (!response.ok) {
						console.error("Request Error:", response.statusText)
						return [];
					}
					return response;
				})
				.then(res => res.json())
		}))
			.then(resp => {
				if(resp) {
					let data = _.flatten(resp);

					// Sort to put null dates at the top followed by the start time
					data = data.sort((a, b) => {
						if(a.start_time === null) return -1;
						if(b.start_time === null) return 1;

						a = moment(a.start_time).unix();
						b = moment(b.start_time).unix();

						if (a > b) {
							return -1;
						} else if (b > a) {
							return 1;
						} else {
							return 0;
						}
					});

					// Allow only entries from the last 4 hours to be displayed, or has no Start Time
					data = _.filter(data, elm => {
						if(elm.start_time === null) return true;
						return (moment().unix() - moment(elm.start_time).unix()) < (60 * 60 * 4)
					});

					data = data.map(entry => {
						// Convert this CircleCi Status into a Friendly Status Entry
						return {
							type: entry.why,
							timestamp: entry.start_time,
							organization: entry.username,
							username: entry.user.login,
							logo: entry.user.avatar_url,
							repository: entry.reponame,
							branch: entry.branch,
							status: entry.status,
							title: entry.subject,
							number: entry.build_num,
							workflow: entry.workflows.workflow_id,
							buildUrl: entry.build_url,
							isPullRequests: (entry.pull_requests.length !== 0),
							pullRequest: (entry.pull_requests.length !== 0) ? entry.pull_requests[0] : null,
						}
					})
					dispatch({type: GET_CIRCLE_EVENTS_SUCCESS, payload: data})
				}
				else {
					dispatch({type: GET_CIRCLE_EVENTS_FAIL})
				}
			})
			.catch(err => {
				dispatch({type: GET_CIRCLE_EVENTS_FAIL})
			})
	}
}