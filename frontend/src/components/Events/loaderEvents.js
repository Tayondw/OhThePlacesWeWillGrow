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
};
