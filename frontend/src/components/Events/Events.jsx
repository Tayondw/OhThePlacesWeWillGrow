import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import eventImage from "../../assets/event-1.png";
import "./Events.css";

const Events = () => {
	const allEvents = useLoaderData();
	const navigate = useNavigate();
	// console.log("checking for all events", allEvents);

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
		<div id="allEvents">
			<h1 id="events-in-meetup">Events in Meetup</h1>
			<hr />
			{formatEventDate &&
				formatEventDate.map((event, index) => (
					<>
						<div
							key={event.id}
							className="eventDetail"
							onClick={() => navigate(`/events/${event.id}`)}
							style={{ cursor: "pointer" }}
						>
							{/* <div id="eventImage">
							<img src={images[index % images.length]} alt={event.name} />
						</div> */}
							<div key={index} id="eventImage">
								<img src={eventImage} alt={event.name} />
								<div id="eventInfo">
									<p className="allEvents-date">{event.startDate}</p>
									<h4 className="allEvents-name">{event.name}</h4>
									{event.Venue ? (
										<p className="allEvents-venue">{`${event.Venue.city}, ${event.Venue.state}`}</p>
									) : (
										<p className="allEvents-venue">Online</p>
									)}
								</div>
							</div>
								<div id="event-desc">{event.description}</div>
						</div>
						<hr id="event-separator" />
					</>
				))}
			<Outlet />
		</div>
	);
};

export default Events;
