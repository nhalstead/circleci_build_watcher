import React, {Component} from 'react';
import {connect} from "react-redux";
import BuildCard from "./components/BuildCard";
import './App.css';
import {getEventsFromConfig} from "../store/actions/circle_ci";
import EmptyCard from "./components/EmptyCard";

class App extends Component {

	componentDidMount() {

		this.props.getEventsFromConfig();

		setInterval(() => {
			this.props.getEventsFromConfig();
		}, 10000)

	}

	render() {
		const {events} = this.props;

		return (
			<div id="content">
				{events.length !== 0 ? (
					events.map(event => {
						return (
							<BuildCard
								key={`card-${event.organization}-${event.repository}-${event.number}`}
								status={event.status}
								org={event.organization}
								repo={event.repository}
								branch={event.branch}
								buildNumber={event.number}
								author={event.username}
								authorIcon={event.logo}
								timestamp={event.timestamp}
								isPullRequest={event.isPullRequests}
								pullRequest={event.pullRequest}
								link={`https://app.circleci.com/pipelines/${event.type}/${event.organization}/${event.repository}/${event.number}/workflows/${event.workflow}/jobs/${event.number}`}
							/>
						)
					})
				) : (
					<EmptyCard
						message={"No builds to show in the last 4 hours."}
					/>
				)}
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	events: state.circle_ci.events,
});

const mapDispatchToProps = (dispatch) => ({
	getEventsFromConfig: (conf) => dispatch(getEventsFromConfig(conf)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)