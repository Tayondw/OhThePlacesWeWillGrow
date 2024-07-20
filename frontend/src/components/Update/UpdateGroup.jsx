import { useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UpdateGroup = () => {
	const fetcher = useFetcher();
	const allGroups = useLoaderData();
	const sessionUser = useSelector((state) => state.session.user);
	const groupUrl = parseInt(window.location.href.split("/")[4], 10);
	const navigate = useNavigate();

	// Ensure user is logged in
	useEffect(() => {
		if (!sessionUser) {
			navigate("/");
		}
	}, [sessionUser, navigate]);

	// Find the group to update
	const groupToUpdate = allGroups.find((group) => group.id === groupUrl);

	// Ensure user is the group owner
	useEffect(() => {
		if (
			groupToUpdate &&
			sessionUser &&
			groupToUpdate.organizerId !== sessionUser.id
		) {
			navigate("/");
		}
	}, [groupToUpdate, sessionUser, navigate]);

	// Initialize state with group data
	const [location, setLocation] = useState("");
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [type, setType] = useState("");
	const [privacy, setPrivacy] = useState("");
	const [previewImage, setUrl] = useState("");
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (groupToUpdate) {
			setLocation(`${groupToUpdate.city || ""}, ${groupToUpdate.state || ""}`);
			setName(groupToUpdate.name || "");
			setAbout(groupToUpdate.about || "");
			setType(groupToUpdate.type || "");
			setPrivacy(groupToUpdate.private ? "true" : "false"); // Convert boolean to string for select input
			setUrl(groupToUpdate.previewImage || "");
		}
	}, [groupToUpdate]);

	const onSubmit = async (event) => {
		event.preventDefault();
		const errs = {};
            if (!location.length) errs.location = "Location is required.";
            const [city, state] = location.split(", ").map(item => item.trim());
		// const [city, state] = location.split(", ");
		if (!city || !state)
			errs.location =
				"Please enter a city and state, separated by a comma and a space.";
		if (!name.length) errs.name = "Name is required";
		if (about.length < 50)
			errs.about = "Description must be at least 50 characters";
		if (!type) errs.type = "Group Type is required";
		if (!privacy) errs.privacy = "Visibility Type is required";
		if (
			!previewImage ||
			(!previewImage.endsWith(".png") &&
				!previewImage.endsWith(".jpg") &&
				!previewImage.endsWith(".jpeg"))
		)
			errs.previewImage = "Image URL must end in .png, .jpg, or .jpeg";

		if (Object.keys(errs).length) {
			setErrors(errs);
			return;
		} else {
			setErrors({});
			// Continue with form submission
			// console.log("Form submitted successfully with data:", {
			// 	location,
			// 	name,
			// 	about,
			// 	type,
			// 	privacy,
			// 	previewImage,
			// 	groupUrl,
                  // });
                  fetcher.submit(
                        { city, state, name, about, type, privacy, previewImage, groupUrl, location },
                        { method: "put", action: `/groups/${groupUrl}` }
                    );
			// fetcher.submit(
			// 	{ location, name, about, type, privacy, previewImage, groupUrl },
			// 	{ method: "put", action: `/groups/${groupUrl}` }
			// );
		}
	};

	return (
		<div id="update-group">
			<div id="update-form">
				<fetcher.Form
					method="put"
					action={`/groups/${groupUrl}`}
					className="update-group"
					onSubmit={onSubmit}
				>
					<div id="header">
						<h2>UPDATE YOUR GROUP&apos;S INFORMATION</h2>
						<h2>
							We&apos;ll walk you through a few steps to update your
							group&apos;s information
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
									required
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
									placeholder="Please write at least 30 characters"
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
								<label htmlFor="type-select">
									Is this an in-person or online group?
									<select
										name="type"
										id="type-select"
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
										<option value="true">Private</option>
										<option value="false">Public</option>
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
										name="previewImage"
										value={previewImage}
										onChange={(event) => setUrl(event.target.value)}
									/>
								</label>
								{errors.previewImage && (
									<p style={{ color: "red" }} className="errors">
										{errors.previewImage}
									</p>
								)}
							</div>
						</div>
						<hr />
					</div>
					<div id="section-5-create">
						<button id="submit" type="submit">
							Update group
						</button>
					</div>
				</fetcher.Form>
			</div>
		</div>
	);
};

export default UpdateGroup;