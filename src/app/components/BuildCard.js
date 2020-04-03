import React, {Component} from "react";
import failedIcon from './failed.svg';
import canceledIcon from './canceled.svg';
import succeededIcon from './succeeded.svg';
import runningIcon from './running.svg';
import waitingIcon from './waiting.svg';
import unknownIcon from './unknown.svg';
import {ReactComponent as PullRequest} from './pull_request.svg';
import moment from "moment";

class BuildCard extends Component {

	render() {
		const {status, org, repo, buildNumber, author, authorIcon, link, timestamp, branch, isPullRequest, pullRequest} = this.props;
		let statusCss = "unknown";
		let statusText = "Unknown";
		let statusIcon = unknownIcon;

		if(status === "success") {
			statusCss = "succeeded";
			statusText = "Success";
			statusIcon = succeededIcon;
		}
		else if(status === "failed") {
			statusCss = "failed";
			statusText = "Failed";
			statusIcon = failedIcon;
		}
		else if(status === "canceled") {
			statusCss = "canceled";
			statusText = "Canceled";
			statusIcon = canceledIcon;
		}
		else if(status === "running") {
			statusCss = "running";
			statusText = "Running";
			statusIcon = runningIcon;
		}
		else if(status === "waiting" || status === "not_running") {
			statusCss = "waiting";
			statusText = "Queued";
			statusIcon = waitingIcon;
		}

		return (
			<div className="build_card">
				<p className="build_name">
					{org} / {repo}
				</p>

				<div className="status-area" style={{paddingTop: "8px"}}>
					<div className="user-icon" data-component="frontend.components.pieces.status/badge">
						<div className="status-icon">
							<img src={authorIcon || unknownIcon} className="dashboard-icon" alt={"User Avatar: " + author} />
						</div>
						<div className="badge-label">{ author || <i>unknown</i>}</div>
					</div>
					<a href={link || "https://circleci.com"} target="_blank" rel={"noopener noreferrer"} style={{display: "inline-block"}}>
						<div title={statusText} className={statusCss} data-component="frontend.components.pieces.status/badge">
							<div className="status-icon" style={{paddingTop: "4px"}}>
								<img src={statusIcon} className="css-1rozygh" alt={"Status: " + statusText}/>
							</div>
							<div className="badge-label">{ statusText } #{ buildNumber }</div>
						</div>
					</a>
					<div style={{marginLeft: "8px", marginTop: "-2px"}}>
						<span style={{color: "gray", fontSize: "12px"}}>
							{ moment(timestamp).fromNow() } on  { branch }
							{isPullRequest && (
								<a href={pullRequest.url} target="_blank" rel={"noopener noreferrer"} style={{display: "inline-block", paddingLeft: "4px", position: "relative", top: "4px"}}>
									<PullRequest
										fill={"gray"}
										height={"18px"}
										width={"18px"}
									/>
								</a>
							)}
						</span>
					</div>
				</div>
			</div>
		)
	}

}

export default BuildCard;