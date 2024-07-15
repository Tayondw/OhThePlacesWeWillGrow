import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomePage.css";
import collage1 from "../../assets/meetup-1.png";
import collage2 from "../../assets/event-growth.png";
import collage3 from "../../assets/meetup-4.png";
import collage4 from "../../assets/meetup-6.png";
import allGroups from "../../assets/allGroups.png";
import allEvents from "../../assets/allEvents.png";
import newGroup from "../../assets/newGroup.png";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

const HomePage = () => {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div id="all-four">
			<div id="section-1">
				<div className="intro">
					<div className="intro-text">
						<h1>
							The cultivate platform — Where the places you go contain the
							places in which you&apos;ll grow
						</h1>
					</div>
					<div className="intro-desc">
						<p>
							The cultivate platform—Where the places you go contain the places
							in which you will growThe cultivate platform—Where the places you
							go contain the places in which you will growThe cultivate
							platform—Where the places you go contain the places in which you
							will growThe cultivate platform—Where the places you go contain
							the places in which you will growThe cultivate platform—Where the
							places you go contain the places in which you will growThe
							cultivate platform—Where the places you go contain the places in
							which you will grow
						</p>
					</div>
				</div>
				<div className="img-holder">
					<img src={collage1} alt="meetup collage" />
					<img src={collage2} alt="meetup collage" />
					<img src={collage3} alt="meetup collage" />
					<img src={collage4} alt="meetup collage" />
				</div>
			</div>
			<div id="section-2">
				<div className="meetup-text">
					<h2>Where We Will Grow</h2>
				</div>
				<div className="meetup-desc">
					<p>
						The cultivate platform—Where the places you go contain the places in
						which you will growThe cultivate platform—Where the places you go
						contain the places in which you will growThe cultivate
						platform—Where the places you go contain the places in which you
						will grow
					</p>
				</div>
			</div>
			<div id="section-3">
				<div className="meetup-links">
					<img className="meetup-img" src={allGroups} alt="all-groups" />
					<Link className="nav-link" to="/groups">
						See all groups
					</Link>
					<div className="link-desc">
						<p>
							The cultivate platform—Where the places you go contain the places
							in which you will grow
						</p>
					</div>
				</div>
				<div className="meetup-links">
					<img src={allEvents} alt="all-events" />
					<Link className="nav-link" to="/events">
						Find an event
					</Link>
					<div className="link-desc">
						<p>
							The cultivate platform—Where the places you go contain the places
							in which you will grow
						</p>
					</div>
				</div>
				<div className="meetup-links">
					<img src={newGroup} alt="new-group" />
					{sessionUser ? (
						<Link className="nav-link" to="/groups/create">
							Start a new group
						</Link>
					) : (
						<Link className="disabled" to="/groups/create">
							Start a new group
						</Link>
					)}

					<div className="link-desc">
						<p>
							The cultivate platform—Where the places you go contain the places
							in which you will grow
						</p>
					</div>
				</div>
			</div>
			<div id="section-4">
				{sessionUser ? null : (
					<OpenModalButton
						buttonText="Join Us"
						style={{
							background: `linear-gradient(45deg, #ff5e5e, #135c51)`,
							border: 0,
							width: `250px`,
							cursor: `pointer`,
							borderRadius: `40px`,
							padding: `12px 25px`,
							fontSize: `1em`,
						}}
						modalComponent={<SignupFormModal />}
					/>
				)}
			</div>
			<Outlet />
		</div>
	);
};

export default HomePage;
