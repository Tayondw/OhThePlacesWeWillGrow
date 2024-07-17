import { json } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";

export const loaderEvent = async () => {
	const response = await csrfFetch(`/api/events`);

	if (response.ok) {
		const allEvents = await response.json();
		return allEvents.Events;
	}
};

export const loaderEventDetails = async ({ params }) => {
	const urls = [
		`/api/events/${params.eventId}`,
            `/api/events/${params.eventId}/attendees`,
            `/api/groups/${params.eventId}/members`
	];

	const fetchPromises = urls.map((url) =>
		csrfFetch(url).then((response) => response.json())
	);

	const [eventDetail, eventAttendees, eventStatus] = await Promise.all(fetchPromises);

	return json({ eventDetail, eventAttendees, eventStatus });
};
