import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation-bonus";
import * as sessionActions from "./store/session";
// import { useLoaderData } from "react-router-dom";
// import { loginAction } from "./components/LoginFormModal/loginAction";
// import { loginLoader } from "./components/LoginFormModal/loginAction";

const Layout = () => {
      const dispatch = useDispatch();
      // let user = useLoaderData();
      // console.log("checking for user", user);
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
                        element: <>
                              <h1>Growthup</h1>
                              <p>The cultivate platform—Where the places you go contain the places in which you will grow</p>
                        </>,
                        
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
