import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";

const Layout = () => {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	return <>{isLoaded && <Outlet />}</>;
};

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <h1>Welcome!</h1>,
			},
			{
				path: "/login",
				element: <LoginFormPage />,
                  },
                  {
                        path: "/signup",
				element: <SignupFormPage />,
                  }
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
