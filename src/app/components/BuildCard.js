import React, {Component} from "react";
import failedIcon from './failed.svg';
import canceledIcon from './canceled.svg';
import succeededIcon from './succeeded.svg';
import runningIcon from './running.svg';
import waitingIcon from './waiting.svg';
import unknownIcon from './unknown.svg';
import {ReactComponent as PullRequest} from './pull_request.svg';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

const trimName = (input, length = 25, dotTrim = 3) => {
	return (input || "").length > length ?
					input.substring(0, length - dotTrim) + "..." :
					input;
}
const grabEnd = (input, length = 25) => {
	if(input.length > length) return  "..." + input.substring(input.length - (length - 3));
	return input;
}

class BuildCard extends Component {

	render() {
		const {data} = this.props;
		
		const status = data.status.toLowerCase();

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
		else if(status === "waiting" || status === "queued" || status === "not_running" || status === "none") {
			statusCss = "waiting";
			statusText = "Queued";
			statusIcon = waitingIcon;
		}


		let url = `https://app.circleci.com/pipelines/${data.type}/${data.organization}/${data.repository}/${data.number}/workflows/${data.workflow}/jobs/${data.number}`;
		if(!data.workflow) {
			// For Orgs who don't have Pipeline Processing Enabled
			url = `https://app.circleci.com/pipelines/${data.type}/${data.organization}/${data.repository}/jobs/${data.number}`;
		}

		return (
			<div className="build_card">
				<p className="build_name">
					{data.organization}/{data.repository}
					{data.workflow_job_name && (
						<span style={{color: "gray", fontSize: "12px"}}>
							&nbsp;{data.workflow_job_name}
						</span>
					)}
				</p>

				<div className="status-area" style={{paddingTop: "8px"}}>
					<div className="user-icon" data-component="frontend.components.pieces.status/badge">
						<div className="status-icon">
							<img src={data.logo || unknownIcon} className="dashboard-icon" alt={"User Avatar: " + data.author} />
						</div>
						<div className="badge-label">{ trimName(data.username, 12, 2) || <i>unknown</i>}</div>
					</div>
					<a href={url || "https://circleci.com"} target="_blank" rel={"noopener noreferrer"} style={{display: "inline-block"}}>
						<div title={statusText} className={statusCss} data-component="frontend.components.pieces.status/badge">
							<div className="status-icon" style={{paddingTop: "4px"}}>
								<img src={statusIcon} className="css-1rozygh" alt={"Status: " + statusText}/>
							</div>
							<div className="badge-label">{ statusText } #{ data.number }</div>
						</div>
					</a>
					<div style={{marginLeft: "8px", marginTop: "-2px"}}>
						<span style={{color: "gray", fontSize: "12px"}}>
							{ data.timestamp ? dayjs(data.timestamp).fromNow() + " on " : "Pending build for " }{ grabEnd(data.branch, 25) }
							{data.hasPullRequests && (
								<a href={data.pullRequest.url} target="_blank" rel={"noopener noreferrer"} style={{display: "inline-block", paddingLeft: "4px", position: "relative", top: "4px"}}>
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