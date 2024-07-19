import { csrfFetch } from "../../store/csrf";
import { json } from "react-router-dom";

export const deleteGroupDetailsLoader = async ({ params }) => {
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

export const deleteEventAction = async ({ request }) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);

	// let intent = formData.get("intent");
      const response = await csrfFetch(`/api/events/${data.id}`, {
            method: "DELETE",
      });

      if (response.ok) {
            return { message: "Successfully deleted" };
      }
	// if the intent is delete, delete the tweet
	// if (intent === "delete") {
	// 	// if there was an error deleting the group
	// 	// return { message: "Error deleting group" };
	// }
};
