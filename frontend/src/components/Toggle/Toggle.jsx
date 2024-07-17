import { Outlet, useNavigate } from "react-router-dom";
import Groups from "../Groups";
import Events from "../Events";
import "./Toggle.css";

const Toggle = () => {
	const navigate = useNavigate();
      const url = window.location.href.split("/")[3];

	return (
		<div id="toggle">
			<div id="section-header">
				<h2
					onClick={() => {
						if (url !== "events") {
							navigate("/events");
						}
					}}
					className={url === "events" ? "active neutral" : "inactive clickable"}
				>
					{"Events"}
				</h2>
				<h2
					onClick={() => {
						if (url !== "groups") {
							navigate("/groups");
						}
					}}
					className={url === "groups" ? "active neutral" : "inactive clickable"}
				>
					{"Groups"}
				</h2>
                  </div>
                  <div id="which">
                        {url === 'events' ? <Events/> : <Groups />}
                  </div>
                  <Outlet />
		</div>
	);
};

export default Toggle;
