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
	// console.log("CHECK REQUEST", request);
	let formData = await request.formData();
	console.log("CHECK FORM DATA", formData);
	// const name = formData.get("name");
	// const about = formData.get("about");
	// const location = formData.get("location");
	// const type = formData.get("type");
	// const image = formData.get("image");
	// const privacy = formData.get("private");
	// const [city, state] = formData.get("location").split(", ");
	const errors = {};
	let data = Object.fromEntries(formData);
	console.log("CHECKING MY DATA", data);
	// console.log("THIS IS THE NAME", name);
	// console.log("THIS IS THE LOCATION", location);
	// console.log("THIS IS THE ABOUT", about);
	// console.log("THIS IS THE IMAGE", image);
	// console.log("THIS IS THE CITY", city);
	// console.log("THIS IS THE STATE", state);
	// console.log("THIS IS THE TYPE", type);
	// console.log("THIS IS THE PRIVACY", privacy);

	if (!data.location || !data.location.length) errors.location = "Location is required";
	if (!data.name || !data.name.length) errors.name = "Name is required";
	if (data.about && data.about.length < 50)
		errors.about = "Description must be at least 50 characters";
	if (!data.type) errors.type = "Group Type is required";
	if (data.private === undefined) errors.private = "Visibility Type is required";
	if (
		!data.url ||
		(!data.url.endsWith(".png") &&
			!data.url.endsWith(".jpg") &&
			!data.url.endsWith(".jpeg"))
	)
		errors.url = "Image URL must end in .png, .jpg, or .jpeg";
	let [city, state] = data.location.split(", ");
	if (!city || !state)
		errors.location =
			"Please enter a city and state, separated by a comma and a space.";

	console.log("Validation Errors:", errors);

	data["city"] = city;
	data["state"] = state;
	delete data.location;

	if (Object.keys(errors).length) {
		return errors;
      }
      

	const response = await csrfFetch(`/api/groups`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: data.name,
			about: data.about,
			type: data.type,
			private: data.private,
			city: data.city,
			state: data.state,
		}),
	});

	// console.log("this is response, are we here", response);

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
		console.log("checking group", group);
		if (imageResponse.ok) {
			throw redirect(`/groups/${group.id}`);
		} else {
			const imageError = await imageResponse.json();
			return {
				errors: imageError.errors,
			};
		}
	}

	// console.log("THIS IS DATA", data);

	// let intent = formData.get("intent");

	// if (intent === "delete") {
	//       const response = await csrfFetch(`/api/groups/${data.id}`, {
	//             method: "DELETE",
	// 	});

	//       console.log("did i make it", response);

	// 	if (response.ok) {
	// 		return { message: "Successfully deleted" };
	// 	}
	// }
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

export const createEventAction = async ({ request }, id) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);

	const response = await csrfFetch(`/api/groups/${id}/events`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		const event = await response.json();
		await csrfFetch(`/api/events/${event.id}/images`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				url: request.url,
				preview: true,
			}),
		});
		throw redirect(`/event/${event.id}`);
	}
};
