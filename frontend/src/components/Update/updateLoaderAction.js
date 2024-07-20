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
	delete data.location;

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
