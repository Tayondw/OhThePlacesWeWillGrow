import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
// import { useFetcher } from "react-router-dom";
// import { useLoaderData } from "react-router-dom";
import logo from "../../assets/places_we_grow_logo.png";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
      const sessionUser = useSelector((state) => state.session.user);

      return (
            <div>
                  <div id="nav-bar">
                        <NavLink to="/"><img className="header-logo" src={logo} alt="growthUp logo" /></NavLink>
                        {isLoaded && (
					<ProfileButton user={sessionUser} />
			)}
                  </div>
                  <hr id="nav-break" />
            </div>
	);
};

export default Navigation;
