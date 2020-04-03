import React, {Component} from "react";

class EmptyCard extends Component {

	render () {
		const {message} = this.props;

		return(
			<div style={{color: "#cddc39", margin: "50% auto 0 auto"}}>
				<p style={{textAlign: "center", fontSize: "16px"}}>
					{ message }
				</p>
			</div>
		)
	}

}

export default EmptyCard;