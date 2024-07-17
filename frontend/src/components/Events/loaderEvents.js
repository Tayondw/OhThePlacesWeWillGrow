// import { json } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";

export const loaderEvent = async () => {
	const response = await csrfFetch(`/api/events`);

	if (response.ok) {
		const allEvents = await response.json();
		return allEvents.Events;
	}
};

export const loaderEventDetails = async ({ params }) => {
	const response = await csrfFetch(`/api/events/${params.eventId}`);

	if (response.ok) {
		const eventDetail = await response.json();
		return eventDetail;
	}

	// const urls = [
	// 	`/api/events/${params.eventId}`,
	// ];

	// const fetchPromises = urls.map((url) =>
	// 	csrfFetch(url).then((response) => response.json())
	// );

	// const [eventDetail] = await Promise.all(fetchPromises);

	// return json({ eventDetail});
};
