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
import OpenModalButton from "../OpenModalButton";
import DeleteGroupModal from "../Delete";
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

	// console.log("log", groupDetail);

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

	const upcomingEvents = groupEvents.Events.filter(
		(event) => new Date(event.startDate) >= today
	);
	const pastEvents = groupEvents.Events.filter(
		(event) => new Date(event.startDate) < today
	);

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
		<div id="groups-details">
			<div id="groups-link-holder">
				{"< "}
				<Link to="/groups" id="group-link">
					Groups
				</Link>
			</div>

			{groupDetail && (
				<div id="each-groupDetail">
					<div id="top-each-groupDetail">
						<div id="groupDetailImage">
							<img src={groupImage} alt={groupDetail.name} />
						</div>
						<div id="groupDetailInfo">
							<h2 id="groupDetailName" className="add-padding">
								{groupDetail.name}
							</h2>
							<h4
								id="groupDetailLocation"
								className="add-padding"
							>{`${groupDetail.city}, ${groupDetail.state}`}</h4>
							{groupEvents.Events.length > 1 ? (
								<p id="groupDetailPrivacy" className="add-padding">
									{`${groupEvents.Events.length} events • `}{" "}
									{groupDetail.private ? "Private" : "Public"}
								</p>
							) : (
								<p id="groupDetailPrivacy" className="add-padding">
									{`${groupEvents.Events.length} event • `}
									{groupDetail.private ? "Private" : "Public"}
								</p>
							)}
							<p id="groupDetailOrganizer">
								Organized by {`${firstName} ${lastName}`}
							</p>
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
							{sessionUser && sessionUser.id === groupDetail.Organizer.id ? (
								<div id="crud-buttons">
									<div id="crud-buttons-create">
										<button
											onClick={() =>
												navigate(`/groups/${groupDetail.id}/events/new`)
											}
											style={{ backgroundColor: `gray`, color: `#FAF5E4` }}
										>
											Create event
										</button>
									</div>
									<div id="crud-buttons-update">
										<button
											onClick={() => navigate(`/groups/${groupDetail.id}/edit`)}
											style={{ backgroundColor: `gray`, color: `#FAF5E4` }}
										>
											Update
										</button>
									</div>
									<div id="crud-buttons-delete">
										<OpenModalButton
											groupDetail={groupDetail}
											navigate={navigate}
											className="group-delete-button"
											id="delete-group"
											buttonText="Delete"
											style={{ backgroundColor: "gray", color: `#FAF5E4` }}
											modalComponent={
												<DeleteGroupModal
													groupDetail={groupDetail}
													navigate={navigate}
												/>
											}
										/>
									</div>
								</div>
							) : null}
						</div>
					</div>
					<div id="body-page">
						<div id="organizer">
							<h3 className="groupDetail-h3">Organizer</h3>
							<p className="groupDetail-desc-p">{`${firstName} ${lastName}`}</p>
						</div>
						<div id="groupDetail-about">
							<h3 className="groupDetail-h3">What we&apos;re about</h3>
							<p className="groupDetail-desc-p"> {groupDetail.about}</p>
						</div>
						<div id="events-section">
							<div id="upcoming-events">
								{!upcomingEvents.length ? (
									<h3 className="groupDetail-h3">No Upcoming Events</h3>
								) : (
									<div id="event-list-upcoming">
										<h3 className="groupDetail-h3">
											Upcoming Events ({upcomingEvents.length})
										</h3>
										{formattedUpcomingEvents.map((event, index) => (
											<div id="all-event-item" key={index}>
												<div
													className="event-item"
													onClick={() => navigate(`/events/${event.id}`)}
												>
													<img src={eventImage} alt={event.name} />
													<div className="event-item-dates">
														<p className="event-item-dates-p">
															{event.startDate}
														</p>
														<h4 className="event-item-name-h4">{event.name}</h4>
														{event.Venue ? (
															<p className="event-item-dates-venue">{`${event.Venue.city}, ${event.Venue.state}`}</p>
														) : (
															<p className="event-item-dates-venue">Online</p>
														)}
													</div>
												</div>
												<div className="event-desc-group">
													{event.description}
												</div>
											</div>
										))}
									</div>
								)}
							</div>
							<div id="past-events">
								{!pastEvents.length ? (
									<h3 className="groupDetail-h3">No Past Events</h3>
								) : (
									<div id="event-list-past">
										<h3 className="groupDetail-h3">
											Past Events ({pastEvents.length})
										</h3>
										{formattedPastEvents.map((event, index) => (
											<>
												<div
													key={index}
													className="event-item"
													onClick={() => navigate(`/events/${event.id}`)}
												>
													<img src={eventImage} alt={event.name} />
													<div className="event-item-dates">
														<p className="event-item-dates-p">
															{event.startDate}
														</p>
														<h4 className="event-item-name-h4">{event.name}</h4>
														{event.Venue ? (
															<p className="event-item-dates-venue">{`${event.Venue.city}, ${event.Venue.state}`}</p>
														) : (
															<p className="event-item-dates-venue">Online</p>
														)}
													</div>
												</div>
												<div className="event-desc-group">
													{event.description}
												</div>
											</>
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
