import { csrfFetch } from "../../store/csrf";
import { json, redirect } from "react-router-dom";

export const createGroupLoader = async () => {
	const response = await csrfFetch(`/api/groups`);

	if (response.ok) {
		const allGroups = await response.json();
		return allGroups.Groups;
	}
};

export const createGroupDetailsLoader = async ({ params }) => {
	const urls = [
		`/api/groups/${params.groupId}`,
		`/api/groups/${params.groupId}/events`,
		`/api/groups/${params.groupId}/members`,
	];

	const fetchPromises = urls.map((url) =>
		csrfFetch(url).then((response) => response.json())
	);

	const [groupDetail, groupEvents, groupMembers] = await Promise.all(
		fetchPromises
	);

	return json({ groupDetail, groupEvents, groupMembers });
};

export const createGroupAction = async ({ request }) => {
      console.log("CHECK REQUEST", request);
	let formData = await request.formData();
      let data = Object.fromEntries(formData);
      let [city, state] = data.location.split(", ");
      data["city"] = city;
      data["state"] = state;

      console.log("THIS IS DATA", data);
	try {
		const response = await csrfFetch(`/api/groups`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			const group = await response.json();
			const imageResponse = await csrfFetch(`/api/groups/${group.id}/images`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					url: request.url,
					preview: true,
				}),
			});

			if (imageResponse.ok) {
				throw redirect(`/groups/${group.id}`);
			} else {
				const imageError = await imageResponse.json();
				return {
					errors: imageError.errors,
				};
			}
		} else {
			const errorResponse = await response.json();
			return {
				errors: errorResponse.errors,
			};
		}
	} catch (error) {
		return {
			errors: ["An unexpected error occurred. Please try again later."],
		};
	}
};

// export const createEventLoader = async () => {
// 	const response = await csrfFetch(`/api/events`);

// 	if (response.ok) {
// 		const allEvents = await response.json();
// 		return allEvents.Events;
// 	}
// };

// export const createEventDetailsLoader = async ({ params }) => {
// 	const response = await csrfFetch(`/api/events/${params.eventId}`);

// 	if (response.ok) {
// 		const eventDetail = await response.json();
// 		return eventDetail;
// 	}
// };

// export const createEventAction = async ({ request }, id) => {
// 	let formData = await request.formData();
// 	let data = Object.fromEntries(formData);

// 	const response = await csrfFetch(`/api/groups/${id}/events`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	});

// 	if (response.ok) {
// 		const event = await response.json();
// 		await csrfFetch(`/api/events/${event.id}/images`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				url: request.url,
// 				preview: true,
// 			}),
// 		});
// 		throw redirect(`/event/${event.id}`);
// 	}
// };
