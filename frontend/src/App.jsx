import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation-bonus";
import * as sessionActions from "./store/session";

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
		element: <Layout />,
		children: [
			{
				path: "/",
                        element: <>
                              <h1>Growthup</h1>
                              <p>The cultivate platform—Where the places you go contain the places in which you will grow</p>
                        </>
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
