import { useLoaderData, Link, useNavigate } from "react-router-dom";
import eventImage from "../../assets/event-1.png";
import "./EventDetail.css";

const EventDetail = () => {
	let { eventDetail } = useLoaderData();
	let { eventStatus } = useLoaderData();

	console.log("EVENT DETAILS", eventDetail);
	console.log("EVENT STATUS", eventStatus);

	// const member = eventStatus.Members[0].Membership;
	const member = Object.values(eventStatus.Members).map((status) => {
		return {
			...status,
			status: status.Membership.status,
		};
	});

	console.log("heeeeeeelp", member);

	const coHosts = member
		.filter((coHost) => coHost.status === "co-host")
		.map((coHost) => `${coHost.firstName} ${coHost.lastName}`);

	console.log("print status", coHosts);

	// const member = Object.values(eventStatus).forEach((status) => {
	// 	console.log(
	// 		"check status",
	// 		Object.values(status).map((status) =>
	// 			console.log("**************", status.Membership.status)
	// 		)
	// 	);
	// });

	return (
		<div>
			<div id="link-holder">
				{"< "}
				<Link to="/events" id="event-link">
					Events
				</Link>
			</div>
			<div id="event-header">
				<h1>{eventDetail.name}</h1>
				{coHosts.length > 0 ? (
					<h4>
						Hosted by {coHosts.join(", ")}
						{coHosts.length === 1 ? "" : "s"}
					</h4>
				) : (
					<h4>There is no host at the moment</h4>
				)}
			</div>
		</div>
	);
};

export default EventDetail;
