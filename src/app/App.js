import React, {Component} from 'react';
import {connect} from "react-redux";
import BuildCard from "./components/BuildCard";
import './App.css';
import {getEventsFromConfig} from "../store/actions/circle_ci";
import EmptyCard from "./components/EmptyCard";
import gripLines from "./grip-lines.svg";
import {falsed} from "../constants/helpers";

class App extends Component {

	componentDidMount() {
		this.props.getEventsFromConfig();

		// Set an interval to continue to renew the Events
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
					top: "0",
					right: "0",
				}}>
					<div style={{
						WebkitAppRegion: "drag",
						padding: "8px 14px 4px 4px",
						"&:hover": {
							cursor: "grab"
						}
					}}>
						<img src={gripLines} alt={"grab window mark"} className={"grab"} onDragStart={falsed}/>
					</div>
				</div>
				<div id="content">
					{events.length !== 0 ? (
						events.map(event => {
							return (
								<BuildCard
									key={`card-${event.organization}-${event.repository}-${event.number}`}
									data={event}
								/>
							)
						})
					) : (
						<EmptyCard
							message={"No builds to show in the last 8 hours."}
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