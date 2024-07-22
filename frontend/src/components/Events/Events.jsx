import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import eventImage from "../../assets/event-1.png";
import "./Events.css";

const Events = () => {
	const allEvents = useLoaderData();
	const navigate = useNavigate();

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
			formattedDate: formatDate(event.startDate),
		};
	});

	const currentDate = new Date();

	const upcomingEvents = formatEventDate
		.filter((event) => new Date(event.startDate) >= currentDate)
		.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

	const pastEvents = formatEventDate
		.filter((event) => new Date(event.startDate) < currentDate)
		.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

	const sortedEvents = [...upcomingEvents, ...pastEvents];

	return (
		<div id="allEvents">
			<h1 id="events-in-meetup">Events in Meetup</h1>
			<hr />
			{sortedEvents.map((event, index) => (
				<>
					<div
						key={event.id}
						className="eventDetail"
						onClick={() => navigate(`/events/${event.id}`)}
						style={{ cursor: "pointer" }}
					>
						<div key={index} id="eventImage">
							<div id="allEvents-event-image">
								<img src={eventImage} alt={event.name} />
							</div>
							<div id="eventInfo">
								<p className="allEvents-date">{event.formattedDate}</p>
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