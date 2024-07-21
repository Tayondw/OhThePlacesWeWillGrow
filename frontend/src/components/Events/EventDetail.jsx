import { Link } from "react-router-dom";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import eventImage from "../../assets/event-1.png";
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
import { FaRegClock } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GrLocationPin } from "react-icons/gr";
import OpenModalButton from "../OpenModalButton";
import DeleteEventModal from "../Delete/DeleteEventModal";
import "./EventDetail.css";

const EventDetail = () => {
	let eventDetail = useLoaderData();
	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();
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

	if (!eventDetail) {
		return <div>Event not found</div>;
	}

	let groupImage = groupImages[eventDetail.groupId - 1];

	if (eventDetail.id > 11) groupImage = groupImages[1];

	const formatDate = (startDate) => {
		const date = new Date(startDate);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return `${year}-${month}-${day} • ${hours}:${minutes}`;
	};

	const formatEventDate = {
		...eventDetail,
		startDate: formatDate(eventDetail.startDate),
		endDate: formatDate(eventDetail.endDate),
	};

	return (
		<div id="events-details">
			<div id="events-link-holder">
				{"< "}
				<Link to="/events" id="event-link">
					Events
				</Link>
			</div>
			<div id="event-header">
				<h1 id="events-details-name">{eventDetail.name}</h1>
				{!eventDetail.host ? (
					<h4 className="events-details-host">
						Currently there is no host to this event!
					</h4>
				) : (
					<h4 className="events-details-host">
						Hosted By {eventDetail.host.firstName} {eventDetail.host.lastName}
					</h4>
				)}
			</div>
			<div id="events-body">
				<div id="event-section-1">
					<div id="events-details-image">
						<img src={eventImage} alt={eventDetail.Group.name} />
					</div>
					<div id="mix-event-group">
						<div id="group-events">
							<div id="events-group-image">
								<img src={groupImage} alt={eventDetail.Group.name} />
							</div>
							<div id="events-group-info">
								<h3>{eventDetail.Group.name}</h3>
								<p>{eventDetail.Group.private ? "Private" : "Public"}</p>
							</div>
						</div>
						<div id="event-event">
							<div id="events-details-date">
								<FaRegClock className="events-details-clock" />
								<div>
									<p>
										START{" "}
										<p style={{ color: "teal" }}>
											{" "}
											{formatEventDate.startDate}
										</p>
									</p>
									<p>
										END{" "}
										<p style={{ color: "teal" }}>{formatEventDate.endDate}</p>
									</p>
								</div>
							</div>
							<div id="events-details-price">
								<MdOutlineAttachMoney className="events-details-price" />
								<div>
									<p>{eventDetail.price}</p>
								</div>
							</div>
							<div id="events-details-location">
								<GrLocationPin className="events-details-location" />
								<div>
									<p>{eventDetail.type}</p>
								</div>
							</div>
						</div>
						<div id="events-update-delete">
							{sessionUser &&
							eventDetail.host &&
							sessionUser.id === eventDetail.host.id ? (
								<>
									<div id="events-update-button">
										<button
											onClick={(event) => {
												event.preventDefault();
												alert("Feature Coming Soon...");
											}}
											id="update-event-button"
											style={{ backgroundColor: `gray`, color: `#FAF5E4` }}
										>
											Update
										</button>
									</div>
									<div id="events-delete-button">
										<OpenModalButton
											eventDetail={eventDetail}
											navigate={navigate}
											className="event-delete-button"
											id="delete-event"
											buttonText="Delete"
											style={{ backgroundColor: `gray`, color: `#FAF5E4` }}
											modalComponent={
												<DeleteEventModal
													eventDetail={eventDetail}
													navigate={navigate}
												/>
											}
										/>
									</div>
								</>
							) : null}
						</div>
					</div>
				</div>
				<div id="event-section-2">
					<h2>Details</h2>
					<p>{eventDetail.description}</p>
				</div>
			</div>
		</div>
	);
};

export default EventDetail;

// import { Link } from "react-router-dom";
// import { useLoaderData, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import eventImage from "../../assets/event-1.png";
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
// import { FaRegClock } from "react-icons/fa";
// import { MdOutlineAttachMoney } from "react-icons/md";
// import { GrLocationPin } from "react-icons/gr";
// import OpenModalButton from "../OpenModalButton";
// import DeleteEventModal from "../Delete/DeleteEventModal";
// import "./EventDetail.css";

// const EventDetail = () => {
// 	let eventDetail = useLoaderData();
// 	// console.log("EVENT DETAILS", eventDetail);
// 	const sessionUser = useSelector((state) => state.session.user);
// 	const navigate = useNavigate();
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

// 	let groupImage = groupImages[eventDetail.groupId - 1];

// 	if (eventDetail.id > 11) groupImage = groupImages[1];

// 	const formatDate = (startDate) => {
// 		const date = new Date(startDate);

// 		const year = date.getFullYear();
// 		const month = String(date.getMonth() + 1).padStart(2, "0");
// 		const day = String(date.getDate()).padStart(2, "0");
// 		const hours = String(date.getHours()).padStart(2, "0");
// 		const minutes = String(date.getMinutes()).padStart(2, "0");

// 		return `${year}-${month}-${day} • ${hours}:${minutes}`;
// 	};

// 	const formatEventDate = {
// 		...eventDetail,
// 		startDate: formatDate(eventDetail.startDate),
// 		endDate: formatDate(eventDetail.endDate),
// 	};

// 	return (
// 		<div id="events-details">
// 			<div id="events-link-holder">
// 				{"< "}
// 				<Link to="/events" id="event-link">
// 					Events
// 				</Link>
// 			</div>
// 			<div id="event-header">
// 				<h1 id="events-details-name">{eventDetail.name}</h1>
// 				{!eventDetail.host ? (
// 					<h4 className="events-details-host">
// 						Currently there is no host to this event!
// 					</h4>
// 				) : (
// 					<h4 className="events-details-host">
// 						Hosted By {eventDetail.host.firstName} {eventDetail.host.lastName}
// 					</h4>
// 				)}
// 			</div>
// 			<div id="events-body">
// 				<div id="event-section-1">
// 					<div id="events-details-image">
// 						<img src={eventImage} alt={eventDetail.Group.name} />
// 					</div>
// 					<div id="mix-event-group">
// 						<div id="group-events">
// 							<div id="events-group-image">
// 								<img src={groupImage} alt={eventDetail.Group.name} />
// 							</div>
// 							<div id="events-group-info">
// 								<h3>{eventDetail.Group.name}</h3>
// 								<p>{eventDetail.Group.private ? "Private" : "Public"}</p>
// 							</div>
// 						</div>
// 						<div id="event-event">
// 							<div id="events-details-date">
// 								<FaRegClock className="events-details-clock" />
// 								<div>
// 									<p>
// 										START{" "}
// 										<p style={{ color: "teal" }}>
// 											{" "}
// 											{formatEventDate.startDate}
// 										</p>
// 									</p>
// 									<p>
// 										END{" "}
// 										<p style={{ color: "teal" }}>{formatEventDate.endDate}</p>
// 									</p>
// 								</div>
// 							</div>
// 							<div id="events-details-price">
// 								<MdOutlineAttachMoney className="events-details-price" />
// 								<div>
// 									<p>{eventDetail.price}</p>
// 								</div>
// 							</div>
// 							<div id="events-details-location">
// 								<GrLocationPin className="events-details-location" />
// 								<div>
// 									<p>{eventDetail.type}</p>
// 								</div>
// 							</div>
// 						</div>
// 						<div id="events-update-delete">
// 							{sessionUser.id === eventDetail.host.id ? (
// 								<>
// 									<div id="events-update-button">
// 										<button id="update-event-button"
// 											style={{ backgroundColor: `gray`, color: `#FAF5E4` }}
// 										>
// 											Update
// 										</button>
// 									</div>
// 									<div id="events-delete-button">
// 										<OpenModalButton
// 											eventDetail={eventDetail}
// 											navigate={navigate}
// 											className="event-delete-button"
// 											id="delete-event"
// 											buttonText="Delete"
// 											style={{ backgroundColor: `gray`, color: `#FAF5E4` }}
// 											modalComponent={
// 												<DeleteEventModal
// 													eventDetail={eventDetail}
// 													navigate={navigate}
// 												/>
// 											}
// 										/>
// 									</div>
// 								</>
// 							) : null}
// 						</div>
// 					</div>
// 				</div>
// 				<div id="event-section-2">
// 					<h2>Details</h2>
// 					<p>{eventDetail.description}</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default EventDetail;
