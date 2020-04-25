import React, {Component} from 'react';
import {connect} from "react-redux";
import BuildCard from "./components/BuildCard";
import './App.css';
import {getEventsFromConfig} from "../store/actions/circle_ci";
import EmptyCard from "./components/EmptyCard";
import gripLines from "./grip-lines.svg";

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
			<React.Fragment>
				<div style={{
					position: "fixed",
					bottom: 0,
					display: "flex",
					justifyContent: "center",
					width: "95vw",
				}}>
					<div style={{
						WebkitAppRegion: "drag",
						marginBottom: "4px"
					}}>
						<img src={gripLines} alt={"grab window mark"} className={"grab"}/>
					</div>
				</div>
				<div id="content">
					{events.length !== 0 ? (
						events.map(event => {
							let url = `https://app.circleci.com/pipelines/${event.type}/${event.organization}/${event.repository}/${event.number}/workflows/${event.workflow}/jobs/${event.number}`;
							if(!event.workflow) {
								// For Orgs who don't have Pipeline Processing Enabled
								url = `https://app.circleci.com/pipelines/${event.type}/${event.organization}/${event.repository}/jobs/${event.number}`;
							}

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
									link={url}
								/>
							)
						})
					) : (
						<EmptyCard
							message={"No builds to show in the last 4 hours."}
						/>
					)}
				</div>
			</React.Fragment>
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