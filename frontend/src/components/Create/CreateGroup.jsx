import {
	useLoaderData,
	useFetcher,
	// useNavigate,
	// Outlet,
} from "react-router-dom";
// import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { createGroupAction } from "./createLoaderAction";
// const PRIVATE = ["Private", "Public"];

const CreateGroup = () => {
	let fetcher = useFetcher();
	const allGroups = useLoaderData();
	console.log("is this the city", allGroups.city);
	const sessionUser = useSelector((state) => state.session.user);

	// const navigate = useNavigate();
	// const dispatch = useDispatch();
	// const [location, setLocation] = useState("");
	// const [name, setName] = useState("");
	// const [about, setAbout] = useState("");
	// const [type, setType] = useState("");
	// const [privacy, setPrivacy] = useState("");
	// const [image, setImage] = useState("");
	// let [text, setText] = useState("");
	// const [errors, setErrors] = useState({});
	// const [city, state] = location.split(", ");

	// if (!sessionUser) navigate("/");

	// useEffect(() => {
	// 	if (fetcher.state == "loading") setText("");
	// }, [fetcher.state]);

	// useEffect(() => {
	// 	const errs = {};
	// 	if (!location || location.length === 0)
	// 		errs.location = "Location is required";
	// 	if (!name || name.length === 0) errs.name = "Name is required";
	// 	if (description.length < 30)
	// 		errs.description = "Description must be at least 30 characters";
	// 	if (!groupType) errs.groupType = "Group Type is required";
	// 	if (!visibilityType) errs.visibilityType = "Visibility Type is required";
	// 	if (
	// 		!image ||
	// 		(!image.endsWith(".png") &&
	// 			!image.endsWith(".jpg") &&
	// 			!image.endsWith(".jpeg"))
	// 	)
	// 		errs.image = "Image URL must end in .png, .jpg, or .jpeg";
	// 	if (!city || !state)
	// 		errs.location =
	// 			"Please enter a city and state, separated by a comma and a space.";
	// 	// if (fetcher.state == "loading") setText("");

	// 	setErrors(errs);
	// }, [
	// 	location,
	// 	name,
	// 	description,
	// 	groupType,
	// 	visibilityType,
	// 	image,
	// 	city,
	// 	state,
	// 	// fetcher.state,
	// ]);

	// const handleClick = async (event) => {
	// 	event.preventDefault();
	// 	if (allGroups.errors) {
	// 		console.log("ERRORS IDENTIFIER", allGroups.errors);
	// 	}

	// 	let allow = true;

	// 	const errs = {};

	// 	if (!location || location.length === 0)
	// 		errs.location = "Location is required";
	// 	if (!name || name.length === 0) errs.name = "Name is required";
	// 	if (about.length < 30)
	// 		errs.about = "Description must be at least 30 characters";
	// 	if (!type) errs.type = "Group Type is required";
	// 	if (!privacy) errs.privacy = "Visibility Type is required";
	// 	if (
	// 		!image ||
	// 		(!image.endsWith(".png") &&
	// 			!image.endsWith(".jpg") &&
	// 			!image.endsWith(".jpeg"))
	// 	)
	// 		errs.image = "Image URL must end in .png, .jpg, or .jpeg";

	// 	const [city, state] = location.split(", ");

	// 	if (!city || !state)
	// 		errs.location =
	// 			"Please enter a city and state, separated by a comma and a space.";

	// 	if (Object.keys(errs).length) {
	// 		setErrors(errs);
	// 		return;
	// 	} else {
	// 		setErrors({});
	// 	}

	// 	const request = {
	// 		name,
	// 		about,
	// 		type,
	// 		privat: privacy,
	// 		city,
	// 		state,
	// 		url: image,
	// 	};

	// 	let id = await dispatch(createGroupAction({request})).catch(async (res) => {
	// 		const data = await res.json();
	// 		if (data?.errors) {
	// 			setErrors(data.errors);
	// 			allow = false;
	// 		}
	// 	});

	// 	if (allow) navigate(`/groups${+id}`);
	// };

	console.log("CHECK ALL GROUPS", allGroups);

	return (
		<div id="new-group">
			{sessionUser ? (
				<fetcher.Form
					method="post"
					action="/groups"
					className="create-group"
					// onSubmit={handleClick}
				>
					<div id="header">
						<h1>Start a New Group</h1>
						<h2>
							We&apos;ll walk you through a few steps to build your local
							community
						</h2>
						<hr />
					</div>
					<div id="section-1-create">
						<div id="set-location">
							<h2>First, set your group&apos;s location</h2>
							<div className="caption">
								<p>
									Meetup groups meet locally, in person, and online. We&apos;ll
									connect you with people in your area.
								</p>
							</div>
							<div id="location-input">
								<input
									// key={group}
									type="text"
									placeholder="City, STATE"
									name="location"
									// value={text}
									// onChange={(event) => setText(event.target.value)}
								/>
							</div>
						</div>
						{/* <p style={{ color: "red" }} className="error">
							{errors && errors.location}
						</p> */}
						{/* {errors.location && (
							<p style={{ color: "red" }} className="errors">
								{errors.location}
							</p>
						)} */}
						<hr />
					</div>
					<div id="section-2-create">
						<div id="set-name">
							<h2>What will your group&apos;s name be?</h2>
							<div className="caption">
								<p>
									Choose a name that will give people a clear idea of what the
									group is about.
									<br />
									Feel free to get creative! You can edit this later if you
									change your mind.
								</p>
							</div>
							<div id="name-input">
								<input
									// value={name}
									type="text"
									placeholder="What is your group name?"
									// onChange={(event) => setName(event.target.value)}
									name="name"
									// value={text}
									// onChange={(event) => setText(event.target.value)}
								/>
							</div>
						</div>
						{/* <p style={{ color: "red" }} className="error">
							{errors && errors.name}
						</p> */}
						{/* {errors.name && (
							<p style={{ color: "red" }} className="errors">
								{errors.name}
							</p>
						)} */}
						<hr />
					</div>
					<div id="section-3-create">
						<div id="set-description">
							<h2>Describe the purpose of your group.</h2>
							<div className="caption">
								<p>
									People will see this when we promote your group, but
									you&apos;ll be able to add to it later, too.
									<br />
									<br />
									1. What&apos;s the purpose of the group?
									<br />
									2. Who should join?
									<br />
									3. What will you do at your events?
								</p>
							</div>
							<div id="description-input">
								<textarea
									name="about"
									id="group-name-textarea"
									placeholder="Please write at least 30 characters"
									// value={about}
									// onChange={(event) => setAbout(event.target.value)}
									// value={text}
									// onChange={(event) => setText(event.target.value)}
								></textarea>
							</div>
						</div>
						{/* <p style={{ color: "red" }} className="errors">
							{errors && errors.about}
						</p> */}
						{/* {errors.description && (
							<p style={{ color: "red" }} className="errors">
								{errors.description}
							</p>
						)} */}
						<hr />
					</div>
					<div id="section-4-create">
						<div id="set-privacy">
							<h2>Final steps...</h2>
							<div className="privacy-questions">
								<label htmlFor="privacy-select">
									Is this an in-person or online group?
									<select
										name="type"
										id="privacy-select"
										// value={type}
										// onChange={(event) => setType(event.target.value)}
										// value={text}
										// onChange={(event) => setText(event.target.value)}
									>
										<option value="">(select one)</option>
										<option value="In Person">
											In Person
										</option>
										<option value="Online">Online</option>
									</select>
								</label>
								{/* <p style={{ color: "red" }} className="errors">
									{errors && errors.type}
								</p> */}
								{/* {errors.groupType && (
									<p style={{ color: "red" }} className="errors">
										{errors && errors.type}
									</p>
								)} */}
							</div>
							<div className="privacy-questions">
								<label htmlFor="privacy-select">
									Is this group private or public?
									<select
										name="private"
										id="privacy-select"
										// value={privacy}
										// onChange={(event) => setPrivacy(event.target.value)}
										// value={text}
										// onChange={(event) => setText(event.target.value)}
									>
										<option value="">(select one)</option>
										<option value={true}>Private</option>
										<option value={false}>Public</option>
									</select>
								</label>
								{/* <p style={{ color: "red" }} className="errors">
									{errors && errors.private}
								</p> */}
								{/* {errors.visibilityType && (
									<p style={{ color: "red" }} className="errors">
										{errors && errors.private}
									</p>
								)} */}
							</div>

							<div id="url-input">
								<label htmlFor="input-url">
									Please add an image URL for your group below:
									<input
										// value={image}
										id="input-url"
										type="text"
										placeholder="Image Url"
										// onChange={(event) => setImage(event.target.value)}
										name="url"
										// value={text}
										// onChange={(event) => setText(event.target.value)}
									/>
								</label>
								{/* <p style={{ color: "red" }} className="errors">
									{errors && errors.image}
								</p> */}
								{/* {errors.image && (
									<p style={{ color: "red" }} className="errors">
										{errors && errors.image}
									</p>
								)} */}
							</div>
						</div>
						<hr />
					</div>
					<div id="section-5-create">
						<button id="submit">Create group</button>
					</div>
				</fetcher.Form>
			) : (
				<h1>Please log in to make a group!</h1>
			)}
		</div>
	);
};

export default CreateGroup;
