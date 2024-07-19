import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation-bonus";
import * as sessionActions from "./store/session";
import { Modal } from "./context/Modal";
import HomePage from "./components/HomePage";
import {
	loaderGroup,
	// loaderGroupDetails,
} from "./components/Groups/loaderGroup";
import {
	loaderEvent,
	loaderEventDetails,
} from "./components/Events/loaderEvents";
import {
	createGroupLoader,
	createGroupDetailsLoader,
	createGroupAction,
	createEventAction,
} from "./components/Create/createLoaderAction";
import {
	updateGroupLoader,
	updateGroupAction,
} from "./components/Update/updateLoaderAction";
import {
	deleteGroupDetailsLoader,
	deleteEventAction,
} from "./components/Delete/deleteLoaderAction";
import Toggle from "./components/Toggle";
import GroupDetail from "./components/Groups/GroupDetail";
import EventDetail from "./components/Events/EventDetail";
import CreateGroup from "./components/Create/CreateGroup";
import CreateEvent from "./components/Create/CreateEvent";
import UpdateGroup from "./components/Update";

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
			<Modal />
			<Navigation isLoaded={isLoaded} />
			{isLoaded && <Outlet />}
		</>
	);
};

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/groups",
				loader: loaderGroup,
				element: <Toggle />,
				action: createGroupAction,
			},
			{
				path: "/groups/:groupId",
				loader: deleteGroupDetailsLoader,
				element: <GroupDetail />,
				action: updateGroupAction,
			},
			{
				path: "/groups/new",
				loader: createGroupLoader,
				element: <CreateGroup />,
				action: createGroupAction,
			},
			{
				path: "/groups/:groupId/edit",
				loader: updateGroupLoader,
				element: <UpdateGroup />,
				action: updateGroupAction,
			},
			{
				path: "/events",
				loader: loaderEvent,
				element: <Toggle />,
				action: createEventAction,
			},
			{
				path: "/events/:eventId",
				loader: loaderEventDetails,
				element: <EventDetail />,
				action: deleteEventAction,
			},
			{
				path: "/groups/:groupId/events/new",
				loader: createGroupDetailsLoader,
				element: <CreateEvent />,
				action: createEventAction,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
