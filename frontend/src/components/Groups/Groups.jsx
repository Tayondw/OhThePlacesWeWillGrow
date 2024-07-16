import { Link, useLoaderData, useNavigate } from "react-router-dom";
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

	// images.map(image => console.log(image))

	return (
		<div>
			<Link to="/events" id="event-link">
				Events
			</Link>
			<Link to="/groups" id="group-link">
				Groups
			</Link>
			<h1>Groups in Meetup</h1>
			{allGroups &&
				allGroups.map((group, index) => (
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
							<h2>{group.name}</h2>
							<h4>{`${group.city}, ${group.state}`}</h4>
							<p>{group.about}</p>
							<div className="privacy">
								{group.numEvents > 1 ? (
									<p>
										{`${group.numEvents} events • `}{" "}
										{group.private ? "Private" : "Public"}
									</p>
								) : (
									<p>
										{`${group.numEvents} event • `}{" "}
										{group.private ? "Private" : "Public"}
									</p>
								)}
							</div>
						</div>
						<hr width={2000} />
					</div>
				))}
		</div>
	);
};

export default Groups;
