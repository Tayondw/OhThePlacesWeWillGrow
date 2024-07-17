import { useLoaderData, Link, useNavigate } from "react-router-dom";
import affluent from "../../assets/collageGroup-2.png";
import appAcademy from "../../assets/app-academy.png";
import googleLovers from "../../assets/google-cloud-next.png";
import googleIo from "../../assets/google-io.png";
import render from "../../assets/render.png";
import tec from "../../assets/tec.png";
import bga from "../../assets/bga.png";
import menCryToo from "../../assets/mencrytoo.png";
import techTalk from "../../assets/meetup-5.png";
import sweTalk from "../../assets/swe-talk.png";
import sweStudy from "../../assets/swe-study.png";
import eventImage from "../../assets/event-1.png";
// import { LuDot } from "react-icons/lu";
// import Groups from "./Groups";
import "./GroupDetail.css";

const GroupDetail = () => {
	let { groupDetail } = useLoaderData();
	let { groupEvents } = useLoaderData();
	const navigate = useNavigate();
	console.log("HERE GROUPDETAIL LOADER ...", groupDetail);
	console.log("HERE GROUPEVENTS LOADER ...", [groupEvents]);
	const groupImages = [
		appAcademy,
		googleLovers,
		googleIo,
		render,
		tec,
		bga,
		menCryToo,
		techTalk,
		sweTalk,
		affluent,
		sweStudy,
	];

	// Find the image corresponding to the group's id
	const groupImage = groupImages[groupDetail.id - 1];
	const firstName = groupDetail.Organizer.firstName;
	const lastName = groupDetail.Organizer.lastName;

	const formatDate = (startDate) => {
		const date = new Date(startDate);

		const year = date.getUTCFullYear();
		const month = String(date.getUTCMonth() + 1).padStart(2, "0");
		const day = String(date.getUTCDate()).padStart(2, "0");
		const hours = String(date.getUTCHours()).padStart(2, "0");
		const minutes = String(date.getUTCMinutes()).padStart(2, "0");
		const seconds = String(date.getUTCSeconds()).padStart(2, "0");

		return `${year}-${month}-${day} • ${hours}:${minutes}:${seconds}`;
	};

	const formatEventDate = groupEvents.Events.map((event) => {
		return {
			...event,
			startDate: formatDate(event.startDate),
		};
	});

	return (
		<div>
			<div id="link-holder">
				{"< "}
				<Link to="/groups" id="group-link">
					Groups
				</Link>
			</div>

			{groupDetail && (
				<div>
					<div id="groupImage">
						<img src={groupImage} alt={groupDetail.name} />
					</div>
					<div id="groupInfo">
						<h2>{groupDetail.name}</h2>
						<h4>{`${groupDetail.city}, ${groupDetail.state}`}</h4>
						{groupEvents.Events.length > 1 ? (
							<p>
								{`${groupEvents.Events.length} events • `}{" "}
								{groupDetail.private ? "Private" : "Public"}
							</p>
						) : (
							<p>
								{`${groupEvents.Events.length} event • `}
								{groupDetail.private ? "Private" : "Public"}
							</p>
						)}
						<p>Organized by {`${firstName}, ${lastName}`}</p>
						<div id="join">
							<button
								className="revoke"
								onClick={(event) => {
									event.preventDefault();
									alert("Feature Coming Soon...");
								}}
								style={{ backgroundColor: "red" }}
							>
								Join this group
							</button>
						</div>
					</div>
					<div id="body-page">
						<div id="organizer">
							<h3>Organizer</h3>
							<p>{`${firstName} ${lastName}`}</p>
						</div>
						<div id="about">
							<h3>What we&apos;re about</h3>
							<p>{groupDetail.about}</p>
						</div>
						<div
							id="upcoming-events"
							key={groupDetail.id}
							onClick={() => navigate(`/events/${groupDetail.id}`)}
							style={{ cursor: "pointer" }}
						>
							<h3>Upcoming Events ({groupEvents.Events.length})</h3>
							<div id="info-and-image">
								{/* <div id="eventImage">
									{groupEvents.Events.map((event) => {
										return { ...event };
									}).map((event, index) => (
										
									))}
								</div> */}
								<div id="eventInfo">
									{formatEventDate.map((event, index) => (
										<>
											<img key={index} src={eventImage} alt={event.name} />
											<div key={index}>
												<p>{event.startDate}</p>
												<h4>{event.name}</h4>
												{event.Venue ? (
													<p>{`${event.Venue.city}, ${event.Venue.state}`}</p>
												) : (
													<p>Online</p>
												)}
												{/* <p>{`${event.Venue.city}, ${event.Venue.state}`}</p> */}
											</div>
											<div id="event-desc">{event.description}</div>
										</>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GroupDetail;
