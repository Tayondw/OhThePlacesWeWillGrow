import { csrfFetch } from "../../store/csrf";

export const loginAction = async (user) => {
      const { credential, password } = user;
	const response = await csrfFetch(`/api/session`, {
		method: "POST",
		body: JSON.stringify({ credential, password }),
	});

      // console.log("CHECKING THE RESPONSE", response);
      const data = await response.json();
      // console.log("THIS IS THE THUNK DATA", data);
	return data;
}

export const loginLoader = async () => {
	const response = await csrfFetch(`/api/session`);
	const data = await response.json();
	return data;
};