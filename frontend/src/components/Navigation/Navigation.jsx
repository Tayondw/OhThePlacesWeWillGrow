import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import ProfileButton from "./ProfileButton";

const Navigation = ({isLoaded}) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	const logout = (event) => {
		event.preventDefault();
		dispatch(sessionActions.logout());
	};

	const sessionLinks = sessionUser ? (
		<>
			<li>
				<ProfileButton user={sessionUser} />
			</li>
			<li>
				<button onClick={logout}>Log Out</button>
			</li>
		</>
	) : (
		<>
			<li>
				<NavLink to="/login">Log In</NavLink>
			</li>
			<li>
				<NavLink to="/signup">Sign Up</NavLink>
			</li>
		</>
	);

	return (
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {isLoaded && sessionLinks}
            </ul>
          );
};

export default Navigation;
