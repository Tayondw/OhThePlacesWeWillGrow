import { csrfFetch } from "../../store/csrf";

export const loginAction = async (user) => {
      const { credential, password } = user;
	const response = await csrfFetch(`/api/session`, {
		method: "POST",
		body: JSON.stringify({ credential, password }),
      });
      
      const data = await response.json();
	return data;
}

export const loginLoader = async () => {
	const response = await csrfFetch(`/api/session`);
	const data = await response.json();
	return data;
};