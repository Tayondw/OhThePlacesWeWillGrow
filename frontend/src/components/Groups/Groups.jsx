import { Link, useLoaderData } from "react-router-dom";
import { LuDot } from "react-icons/lu";

const Groups = () => {
	const allGroups = useLoaderData();
	console.log("LOADER DATA----", allGroups);
	return (
		<div>
			<Link to="/events">Events</Link>
			<Link to="/groups">Groups</Link>
			<h1>Groups in Meetup</h1>
			{allGroups &&
				allGroups.map((group) => {
					console.log("show me.....", group);
					return (
						<>
							<div key={group.id} id="groupImage">
								<img src={group.previewImage} alt="" />
							</div>
							<div id="groupInfo">
                                                <h2>{group.name}</h2>
                                                <h4>{`${group.city}, ${group.state}`}</h4>
                                                <p>{group.about}</p>
                                                <div className="privacy">
                                                      <p>{`${group.numEvents} events`}</p>
                                                      <LuDot />
                                                      <p>{group.private ? "Private" : "Public"}</p>
                                                </div>
							</div>
						</>
					);
				})}
		</div>
	);
};

export default Groups;
