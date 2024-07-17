import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation-bonus";
import * as sessionActions from "./store/session";
import HomePage from "./components/HomePage";
import {
	loaderGroup,
	loaderGroupDetails,
} from "./components/Groups/loaderGroup";
import {
	loaderEvent,
	loaderEventDetails,
} from "./components/Events/loaderEvents";
import Groups from "./components/Groups";
import GroupDetail from "./components/Groups/GroupDetail";
import Events from "./components/Events";
import EventDetail from "./components/Events/EventDetail";

const Layout = () => {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && <Outlet />}
		</>
	);
};

const router = createBrowserRouter([
	{
		// loader: loginLoader,
		element: <Layout />,
		// action: loginAction,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/groups",
				loader: loaderGroup,
				element: <Groups />,
			},
			{
				path: "/groups/:groupId",
				loader: loaderGroupDetails,
				element: <GroupDetail />,
			},
			{
				path: "/events",
				loader: loaderEvent,
				element: <Events />,
			},
			{
				path: "/events/:eventId",
				loader: loaderEventDetails,
				element: <EventDetail />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
