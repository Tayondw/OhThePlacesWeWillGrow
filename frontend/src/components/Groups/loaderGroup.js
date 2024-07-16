import { csrfFetch } from "../../store/csrf";

export const loaderGroup = async () => {
	const response = await csrfFetch(`/api/groups`);
	// console.log("INDENTIFIER IN RESPONSE IN LOADER", response);

	if (response.ok) {
		const allGroups = await response.json();
		console.log("IDENTIFIER FROM RESPONSE", allGroups.Groups);
		return allGroups.Groups;
	}
};

// export const testing = async (params) => {
// 	console.log("************", params);
// 	const urls = [
// 		`/api/groups/${params.groupId}`,
// 		`/api/groups/${params.groupId}/events`,
// 		`/api/groups/${params.groupId}/members`,
// 		`/api/groups/${params.groupId}/venues`,
// 	];

// 	const fetchPromises = urls.map((url) =>
// 		fetch(url).then((response) => response.json())
// 	);

// 	const [groupDetail, groupEvents, groupMembers, groupVenues] =
// 		await Promise.all(fetchPromises);

// 	// console.log("************", allGroups);
// 	console.log("++++++++++++", groupDetail);
// 	console.log("------------", groupEvents);
// 	console.log("============", groupMembers);
// 	console.log("%%%%%%%%%%%%", groupVenues);
// };
