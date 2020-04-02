import React, {Component} from 'react';
import {connect} from "react-redux";
import BuildCard from "./components/BuildCard";
import './App.css';
import {getCircleEvents} from "../store/actions/circle_ci";

class App extends Component {

	componentDidMount() {

		this.props.getCircleEvents();

		setInterval(() => {
			this.props.getCircleEvents();
		}, 5000)

	}

	render() {
		return (
			<div id="content">
				<BuildCard
					status={"succeeded"}
					org={"nhalstead"}
					repo={"testing123"}
					buildNumber={"342"}
					author={"nhalstead"}
					authorIcon={"https://avatars3.githubusercontent.com/u/5577816?s=40&amp;v=4"}
				/>
				<BuildCard
					status={"failed"}
					org={"nhalstead"}
					repo={"testing123"}
					buildNumber={"341"}
				/>
				<BuildCard
					org={"nhalstead"}
					repo={"testing123"}
					buildNumber={"341"}
				/>
				<BuildCard
					status={"canceled"}
					org={"nhalstead"}
					repo={"testing123"}
					buildNumber={"340"}
				/>
				<BuildCard
					status={"running"}
					org={"nhalstead"}
					repo={"testing123"}
					buildNumber={"340"}
				/>
				<BuildCard
					status={"waiting"}
					org={"nhalstead"}
					repo={"testing123"}
					buildNumber={"340"}
				/>
			</div>
		);
	}
}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
	getCircleEvents: () => dispatch(getCircleEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(App)