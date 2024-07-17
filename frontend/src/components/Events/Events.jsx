import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import eventImage from "../../assets/event-1.png";
import "./Events.css";

const Events = () => {
	const allEvents = useLoaderData();
	const navigate = useNavigate();
	console.log("checking for all events", allEvents);

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

	const formatEventDate = allEvents.map((event) => {
		return {
			...event,
			startDate: formatDate(event.startDate),
		};
	});

	return (
		<div>
			<h1>Events in Meetup</h1>
			{formatEventDate &&
				formatEventDate.map((event, index) => (
					<div
						key={event.id}
						className="eventDetail"
						onClick={() => navigate(`/events/${event.id}`)}
						style={{ cursor: "pointer" }}
					>
						{/* <div id="eventImage">
							<img src={images[index % images.length]} alt={event.name} />
						</div> */}
						<div id="event">
							<img key={index} src={eventImage} alt={event.name} />
							<div key={index} id="eventInfo">
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
						<hr width={2000} />
					</div>
				))}
			<Outlet />
		</div>
	);
};

export default Events;
