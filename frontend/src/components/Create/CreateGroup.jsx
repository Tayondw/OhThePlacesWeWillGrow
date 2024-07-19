import { useFetcher, Outlet } from "react-router-dom";
// import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const CreateGroup = () => {
	let fetcher = useFetcher();
	// const allGroups = useLoaderData();
	const sessionUser = useSelector((state) => state.session.user);

	// console.log("FETCHER", fetcher);
	// console.log("CHECK ALL GROUPS", allGroups);

	const [location, setLocation] = useState("");
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [type, setType] = useState("");
	const [privacy, setPrivacy] = useState("");
	const [url, setUrl] = useState("");
	const [errors, setErrors] = useState({});

	const onSubmit = async (event) => {
		event.preventDefault();
		const errs = {};
		if (!location.length) errs.location = "Location is required.";
		const [city, state] = location.split(", ");
		if (!city || !state)
			errs.location =
				"Please enter a city and state, separated by a comma and a space.";
		if (!name.length) errs.name = "Name is required";
		if (about.length < 50)
			errs.about = "Description must be at least 50 characters";
		if (!type) errs.type = "Group Type is required";
		if (!privacy) errs.privacy = "Visibility Type is required";
		if (
			!url ||
			(!url.endsWith(".png") && !url.endsWith(".jpg") && !url.endsWith(".jpeg"))
		)
			errs.url = "Image URL must end in .png, .jpg, or .jpeg";

		if (Object.keys(errs).length) {
			setErrors(errs);
			return;
		} else {
			setErrors({});
			// Continue with form submission
                  console.log("Form submitted successfully with data:", { location, name, about, type, privacy, url });
			fetcher.submit({ location, name, about, type, privacy, url }, { method: "post", action: "/groups" });
		}
	};

	return (
		<div id="new-group">
			{sessionUser ? (
				<fetcher.Form
					method="post"
					action="/groups"
					className="create-group"
					onSubmit={onSubmit}
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
									type="text"
									placeholder="City, STATE"
									name="location"
									value={location}
									onChange={(event) => setLocation(event.target.value)}
								/>
							</div>
						</div>
						{errors.location && (
							<p style={{ color: "red" }} className="errors">
								{errors.location}
							</p>
						)}
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
									type="text"
									placeholder="What is your group name?"
									name="name"
									value={name}
									onChange={(event) => setName(event.target.value)}
								/>
							</div>
						</div>
						{errors.name && (
							<p style={{ color: "red" }} className="errors">
								{errors.name}
							</p>
						)}
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
									placeholder="Please write at least 50 characters"
									value={about}
									onChange={(event) => setAbout(event.target.value)}
								></textarea>
							</div>
						</div>
						{errors.about && (
							<p style={{ color: "red" }} className="errors">
								{errors.about}
							</p>
						)}
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
										value={type}
										onChange={(event) => setType(event.target.value)}
									>
										<option value="">(select one)</option>
										<option value="In person">In Person</option>
										<option value="Online">Online</option>
									</select>
								</label>
								{errors.type && (
									<p style={{ color: "red" }} className="errors">
										{errors.type}
									</p>
								)}
							</div>
							<div className="privacy-questions">
								<label htmlFor="privacy-select">
									Is this group private or public?
									<select
										name="private"
										id="privacy-select"
										value={privacy}
										onChange={(event) => setPrivacy(event.target.value)}
									>
										<option value="">(select one)</option>
										<option value={true}>Private</option>
										<option value={false}>Public</option>
									</select>
								</label>
								{errors.privacy && (
									<p style={{ color: "red" }} className="errors">
										{errors.privacy}
									</p>
								)}
							</div>
							<div id="url-input">
								<label htmlFor="input-url">
									Please add an image URL for your group below:
									<input
										id="input-url"
										type="text"
										placeholder="Image Url"
										name="url"
										value={url}
										onChange={(event) => setUrl(event.target.value)}
									/>
								</label>
								{errors.url && (
									<p style={{ color: "red" }} className="errors">
										{errors.url}
									</p>
								)}
							</div>
						</div>
						<hr />
					</div>
					<div id="section-5-create">
						<button id="submit" type="submit">Create group</button>
					</div>
				</fetcher.Form>
			) : (
				<h1>Please log in to make a group!</h1>
                  )}
                  <Outlet />
		</div>
	);
};

export default CreateGroup;