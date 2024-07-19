import { csrfFetch } from "../../store/csrf";
import { redirect } from "react-router-dom";

export const updateGroupLoader = async () => {
	const response = await csrfFetch(`/api/groups`);

	if (response.ok) {
		const allGroups = await response.json();
		return allGroups.Groups;
	}
};

export const updateGroupAction = async ({ request }) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);
	let [city, state] = data.location.split(", ");

	data["city"] = city;
	data["state"] = state;
	delete data.location;

	let intent = formData.get("intent");

	// if the intent is delete, delete the tweet
	if (intent === "delete") {
		const response = await csrfFetch(`/api/groups/${data.id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			return { message: "Successfully deleted" };
		}
		// if there was an error deleting the group
		// return { message: "Error deleting group" };
	}

	const response = await csrfFetch(`/api/groups/${data.groupUrl}`, {
		method: "PUT",
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
			previewImage: data.previewImage,
		}),
	});

	if (response.ok) {
		const group = await response.json();
		throw redirect(`/groups/${group.id}`);
	}
};
