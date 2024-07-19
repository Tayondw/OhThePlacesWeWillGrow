import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
import "./GroupDetail.css";

const GroupDetail = () => {
	let { groupDetail } = useLoaderData();
	let { groupEvents } = useLoaderData();
	const navigate = useNavigate();
	const sessionUser = useSelector((state) => state.session.user);
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
      
      // console.log("log", groupEvents);

      const groupImage = groupImages[(groupDetail.id - 1) % groupImages.length];
	const firstName = groupDetail.Organizer.firstName;
	const lastName = groupDetail.Organizer.lastName;

	const today = new Date();
	const formatDate = (startDate) => {
		const date = new Date(startDate);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return `${year}-${month}-${day} • ${hours}:${minutes}`;
	};

	const upcomingEvents = groupEvents.Events.filter((event) => new Date(event.startDate) >= today);
	const pastEvents = groupEvents.Events.filter((event) => new Date(event.startDate) < today);

	upcomingEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
	pastEvents.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

	const formatEventDate = (events) =>
		events.map((event) => ({
			...event,
			startDate: formatDate(event.startDate),
		}));

	const formattedUpcomingEvents = formatEventDate(upcomingEvents);
	const formattedPastEvents = formatEventDate(pastEvents);

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
						{!sessionUser ||
						sessionUser.id === groupDetail.Organizer.id ? null : (
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
						)}
						{sessionUser.id === groupDetail.Organizer.id ? (
							<div id="crud-buttons">
								<button
									onClick={() =>
										navigate(`/groups/${groupDetail.id}/events/new`)
									}
									style={{ backgroundColor: `darkgray`, color: `#FAF5E4` }}
								>
									Create event
								</button>
                                                <button
                                                      onClick={() =>
										navigate(`/groups/${groupDetail.id}/edit`)
									}
									style={{ backgroundColor: `darkgray`, color: `#FAF5E4` }}
								>
									Update
								</button>
								<button
									style={{ backgroundColor: `darkgray`, color: `#FAF5E4` }}
								>
									Delete
								</button>
							</div>
						) : null}
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
						<div id="events-section">
							<div id="upcoming-events">
								<h3>Upcoming Events ({upcomingEvents.length})</h3>
								{!upcomingEvents.length ? (
									<p>No Upcoming Events</p>
								) : (
									<div id="event-list">
										{formattedUpcomingEvents.map((event, index) => (
											<div key={index} className="event-item" onClick={() => navigate(`/events/${event.id}`)}>
												<img src={eventImage} alt={event.name} />
												<div>
													<p>{event.startDate}</p>
													<h4>{event.name}</h4>
													{event.Venue ? (
														<p>{`${event.Venue.city}, ${event.Venue.state}`}</p>
													) : (
														<p>Online</p>
													)}
                                                                        </div>
                                                                        <div id="event-desc">{event.description}</div>
											</div>
										))}
									</div>
								)}
							</div>
							<div id="past-events">
								<h3>Past Events ({pastEvents.length})</h3>
								{!pastEvents.length ? (
									<p>No Past Events</p>
								) : (
									<div id="event-list">
										{formattedPastEvents.map((event, index) => (
											<div key={index} className="event-item" onClick={() => navigate(`/events/${event.id}`)}>
												<img src={eventImage} alt={event.name} />
												<div>
													<p>{event.startDate}</p>
													<h4>{event.name}</h4>
													{event.Venue ? (
														<p>{`${event.Venue.city}, ${event.Venue.state}`}</p>
													) : (
														<p>Online</p>
													)}
												</div>
                                                                        <div id="event-desc">{event.description}</div>
                                                                  </div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GroupDetail;


// import { useLoaderData, Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import affluent from "../../assets/collageGroup-2.png";
// import appAcademy from "../../assets/app-academy.png";
// import googleLovers from "../../assets/google-cloud-next.png";
// import googleIo from "../../assets/google-io.png";
// import render from "../../assets/render.png";
// import tec from "../../assets/tec.png";
// import bga from "../../assets/bga.png";
// import menCryToo from "../../assets/mencrytoo.png";
// import techTalk from "../../assets/meetup-5.png";
// import sweTalk from "../../assets/swe-talk.png";
// import sweStudy from "../../assets/swe-study.png";
// import eventImage from "../../assets/event-1.png";
// // import { LuDot } from "react-icons/lu";
// // import Groups from "./Groups";
// import "./GroupDetail.css";

// const GroupDetail = () => {
// 	let { groupDetail } = useLoaderData();
// 	let { groupEvents } = useLoaderData();
// 	const navigate = useNavigate();
// 	const sessionUser = useSelector((state) => state.session.user);
// 	console.log("HERE GROUPDETAIL LOADER ...", groupDetail);
// 	console.log("HERE GROUPEVENTS LOADER ...", [groupEvents]);
// 	const groupImages = [
// 		appAcademy,
// 		googleLovers,
// 		googleIo,
// 		render,
// 		tec,
// 		bga,
// 		menCryToo,
// 		techTalk,
// 		sweTalk,
// 		affluent,
// 		sweStudy,
// 	];

// 	// Find the image corresponding to the group's id
// 	const groupImage = groupImages[groupDetail.id - 1];
// 	const firstName = groupDetail.Organizer.firstName;
// 	const lastName = groupDetail.Organizer.lastName;

// 	const today = new Date();
// 	const formatDate = (startDate) => {
// 		const date = new Date(startDate);

// 		const year = date.getFullYear();
// 		const month = String(date.getMonth() + 1).padStart(2, "0");
// 		const day = String(date.getDate()).padStart(2, "0");
// 		const hours = String(date.getHours()).padStart(2, "0");
// 		const minutes = String(date.getMinutes()).padStart(2, "0");

// 		return `${year}-${month}-${day} • ${hours}:${minutes}`;
// 	};

// 	const formatEventDate = groupEvents.Events.map((event) => {
// 		return {
// 			...event,
// 			startDate: formatDate(event.startDate),
// 		};
// 	});

// 	return (
// 		<div>
// 			<div id="link-holder">
// 				{"< "}
// 				<Link to="/groups" id="group-link">
// 					Groups
// 				</Link>
// 			</div>

// 			{groupDetail && (
// 				<div>
// 					<div id="groupImage">
// 						<img src={groupImages[index % images.length]} alt={groupDetail.name} />
// 					</div>
// 					<div id="groupInfo">
// 						<h2>{groupDetail.name}</h2>
// 						<h4>{`${groupDetail.city}, ${groupDetail.state}`}</h4>
// 						{groupEvents.Events.length > 1 ? (
// 							<p>
// 								{`${groupEvents.Events.length} events • `}{" "}
// 								{groupDetail.private ? "Private" : "Public"}
// 							</p>
// 						) : (
// 							<p>
// 								{`${groupEvents.Events.length} event • `}
// 								{groupDetail.private ? "Private" : "Public"}
// 							</p>
// 						)}
// 						<p>Organized by {`${firstName}, ${lastName}`}</p>
// 						{!sessionUser ||
// 						sessionUser.id === groupDetail.Organizer.id ? null : (
// 							<div id="join">
// 								<button
// 									className="revoke"
// 									onClick={(event) => {
// 										event.preventDefault();
// 										alert("Feature Coming Soon...");
// 									}}
// 									style={{ backgroundColor: "red" }}
// 								>
// 									Join this group
// 								</button>
// 							</div>
// 						)}
// 						{sessionUser.id === groupDetail.Organizer.id ? (
// 							<div id="crud-buttons">
// 								<button
// 									onClick={() =>
// 										navigate(`/groups/${groupDetail.id}/events/new`)
// 									}
// 									style={{ backgroundColor: `darkgray`, color: `#FAF5E4` }}
// 								>
// 									Create event
// 								</button>
// 								<button
// 									style={{ backgroundColor: `darkgray`, color: `#FAF5E4` }}
// 								>
// 									Update
// 								</button>
// 								<button
// 									style={{ backgroundColor: `darkgray`, color: `#FAF5E4` }}
// 								>
// 									Delete
// 								</button>
// 							</div>
// 						) : null}
// 					</div>
// 					<div id="body-page">
// 						<div id="organizer">
// 							<h3>Organizer</h3>
// 							<p>{`${firstName} ${lastName}`}</p>
// 						</div>
// 						<div id="about">
// 							<h3>What we&apos;re about</h3>
// 							<p>{groupDetail.about}</p>
// 						</div>
// 						<div
// 							id="upcoming-events"
// 							key={groupDetail.id}
// 							onClick={() => navigate(`/events/${groupDetail.id}`)}
// 							style={{ cursor: "pointer" }}
// 						>
// 							{!groupEvents.Events.length ? (
// 								<h3>No Upcoming Events</h3>
// 							) : (
// 								<>
// 									<h3>Upcoming Events ({groupEvents.Events.length})</h3>
// 									<div id="info-and-image">
// 										<div id="eventInfo">
// 											{formatEventDate.map((event, index) => (
// 												<>
// 													<div key={index}>
// 														<img src={eventImage} alt={event.name} />
// 														<div>
// 															<p>{event.startDate}</p>
// 															<h4>{event.name}</h4>
// 															{event.Venue ? (
// 																<p>{`${event.Venue.city}, ${event.Venue.state}`}</p>
// 															) : (
// 																<p>Online</p>
// 															)}
// 														</div>
// 													</div>

													// <div id="event-desc">{event.description}</div>
// 												</>
// 											))}
// 										</div>
// 									</div>
// 								</>
// 							)}
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default GroupDetail;
