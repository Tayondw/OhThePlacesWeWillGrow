import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation-bonus";
import * as sessionActions from "./store/session";
import HomePage from "./components/HomePage";
// import { useLoaderData } from "react-router-dom";
// import { loginAction } from "./components/LoginFormModal/loginAction";
// import { loginLoader } from "./components/LoginFormModal/loginAction";

const Layout = () => {
      // let user = useLoaderData();
      // console.log("checking for user", user);
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
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
