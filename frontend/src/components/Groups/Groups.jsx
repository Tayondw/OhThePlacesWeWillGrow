import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import affluent from "../../assets/collageGroup-2.png";
import appAcademy from "../../assets/app-academy.png";
import googleLovers from "../../assets/google-cloud-next.png";
import googleIo from "../../assets/google-io.png";
import render from "../../assets/render.png";
import tec from "../../assets/tec.png";
import bga from "../../assets/bga.png";
import menCryToo from "../../assets/mencrytoo.png";
import techTalk from "../../assets/meetup-5.png";
import sweTalk from "../../assets/swe-talk.png";
import sweStudy from "../../assets/swe-study.png";
// import { LuDot } from "react-icons/lu";
import "./Groups.css";

const Groups = () => {
	const allGroups = useLoaderData();
	const navigate = useNavigate();
	const images = [
		appAcademy,
		googleLovers,
		googleIo,
		render,
		tec,
		bga,
		menCryToo,
		techTalk,
		sweTalk,
		affluent,
		sweStudy,
	];

	return (
		<div id="view-group">
			<h2 id="groups-in-meetup">Groups in Meetup</h2>
			<hr />
			{allGroups &&
				allGroups.map((group, index) => (
					<>
						<div
							key={group.id}
							className="groupDetail"
							onClick={() => navigate(`/groups/${group.id}`)}
							style={{ cursor: "pointer" }}
						>
							<div id="groupImage">
								<img src={images[index % images.length]} alt={group.name} />
							</div>
							<div id="groupInfo">
								<h2 id="all-group-name">{group.name}</h2>
								<h4 id="all-group-location">{`${group.city}, ${group.state}`}</h4>
								<p id="all-group-about">{group.about}</p>
								<div id="privacy">
									{group.numEvents > 1 ? (
										<p className="group-count">
											{`${group.numEvents} events • `}{" "}
											{group.private ? "Private" : "Public"}
										</p>
									) : (
										<p className="group-count">
											{`${group.numEvents} event • `}{" "}
											{group.private ? "Private" : "Public"}
										</p>
									)}
								</div>
							</div>
						</div>
                                    <hr id="group-separator" />
					</>
				))}
			<Outlet />
		</div>
	);
};

export default Groups;
