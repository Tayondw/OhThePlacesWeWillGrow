import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
import logo from "../../assets/places_we_grow_logo.png";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
      const sessionUser = useSelector((state) => state.session.user);
      const navigate = useNavigate();

	return (
		<div id="whole">
			<div id="nav-bar">
				<NavLink to="/">
					<img className="header-logo" src={logo} alt="growthUp logo" />
				</NavLink>
                        {isLoaded && <ProfileButton user={sessionUser} navigate={navigate} />}
			</div>
			<hr id="nav-break" />
		</div>
	);
};

export default Navigation;
