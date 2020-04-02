import React, {Component} from 'react';
import {connect} from "react-redux";
import BuildCard from "./components/BuildCard";
import './App.css';
import {getCircleEvents, getEventsFromConfig} from "../store/actions/circle_ci";
import _ from "lodash";

class App extends Component {

	componentDidMount() {

		this.getEventsFromConfig();

		setInterval(() => {
			this.getEventsFromConfig();
		}, 10000)

	}

	getEventsFromConfig = () => {

		const configs = [
		];
		this.props.getEventsFromConfig(configs);
	}

	render() {
		const {events} = this.props;

		return (
			<div id="content">
				{events.map(event => {
					return (
						<BuildCard
							key={`card-${event.organization}-${event.repository}-${event.number}`}
							status={event.status}
							org={event.organization}
							repo={event.repository}
							buildNumber={event.number}
							author={event.username}
							authorIcon={event.logo}
							timestamp={event.timestamp}
							link={`https://app.circleci.com/pipelines/${event.type}/${event.organization}/${event.repository}/${event.number}/workflows/${event.workflow}/jobs/${event.number}`}
						/>
					)
				})}
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	events: state.circle_ci.events,
});

const mapDispatchToProps = (dispatch) => ({
	getCircleEvents: () => dispatch(getCircleEvents()),
	getEventsFromConfig: (conf) => dispatch(getEventsFromConfig(conf)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)