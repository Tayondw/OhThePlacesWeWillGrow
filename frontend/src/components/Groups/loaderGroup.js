import { json } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";

export const loaderGroup = async () => {
	const response = await csrfFetch(`/api/groups`);

	if (response.ok) {
		const allGroups = await response.json();
		return allGroups.Groups;
	}
};

export const loaderGroupDetails = async ({ params }) => {
	const urls = [
		`/api/groups/${params.groupId}`,
		`/api/groups/${params.groupId}/events`,
	];

	const fetchPromises = urls.map((url) =>
		csrfFetch(url).then((response) => response.json())
	);

	const [groupDetail, groupEvents] = await Promise.all(fetchPromises);

	return json({ groupDetail, groupEvents });
};
