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
	let formData = await request.formData();
	let data = Object.fromEntries(formData);
	let [city, state] = data.location.split(", ");

	data["city"] = city;
	data["state"] = state;
	delete data.location;

	const response = await csrfFetch(`/api/groups`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: data.name,
			about: data.about,
			type: data.type,
			private: data.privacy,
			city: data.city,
			state: data.state,
		}),
	});

	if (response.ok) {
		const group = await response.json();
		const imageResponse = await csrfFetch(`/api/groups/${group.id}/images`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				url: group.image,
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
	}
};

export const createEventAction = async ({ request }) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);
	data.capacity = +data.capacity;
	data.price = +data.price;
	data.id = +data.id;
	data.venueId = +data.venueId;

	const response = await csrfFetch(`/api/groups/${data.id}/events`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: data.name,
			price: data.price,
			type: data.type,
			startDate: data.startDate,
			endDate: data.endDate,
			previewImage: data.previewImage,
			description: data.description,
			capacity: data.capacity,
			venueId: data.venueId,
		}),
	});

	if (response.ok) {
		const event = await response.json();
		console.log("THIS IS THE EVENT", event);
		await csrfFetch(`/api/events/${event.id}/images`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				url: data.previewImage,
				preview: true,
			}),
		});

		throw redirect(`/events/${event.id}`);
	}
};
