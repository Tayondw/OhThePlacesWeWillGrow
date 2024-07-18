import { useLoaderData, useFetcher } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaCalendarAlt } from "react-icons/fa";

const CreateEvent = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const { groupDetail } = useLoaderData();
	const { groupEvents } = useLoaderData();
	const { groupMembers } = useLoaderData();
	let fetcher = useFetcher();

	const [name] = useState("");
	const [description] = useState("");
	const [startDate] = useState("");
	const [endDate] = useState("");
	const [price] = useState("");
	const [previewImage] = useState("");
	const [type] = useState("");
	const [text, setText] = useState("");
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const errs = {};
		if (!name.length) errs.name = "Name is required";
		if (name.length < 5) errs.name = "Name must be at least 5 characters";
		if (description.length < 30)
			errs.description = "Description must be at least 30 characters";
		if (!type) errs.type = "Event Type is required";
		if (
			!previewImage ||
			(!previewImage.endsWith(".png") &&
				!previewImage.endsWith(".jpg") &&
				!previewImage.endsWith(".jpeg"))
		)
			errs.image = "Image URL must end in .png, .jpg, or .jpeg";
		if (fetcher.state == "loading") setText("");

		setErrors(errs);
	}, [name, description, type, image, fetcher.state]);

	console.log("CHECK ALL GROUP EVENTS", groupEvents);
	console.log("CHECK ALL GROUP DETAILS", groupDetail);
	console.log("CHECK ALL GROUP MEMBERS", groupMembers);

	return (
		<div id="new-event">
			{sessionUser ? (
				<div id="event-section-1">
					<h1>Create an event for {groupDetail.name}</h1>
					<fetcher.Form method="post" action="/events" className="create-event">
						<div id="name-input">
							<label>
								What is the name of your event?
								<input type="text" name="name" placeholder="Event Name" />
							</label>
						</div>
						<hr />
						<div id="event-status">
							<label>
								Is this an in-person or online group?
								<select name="type" id="privacy-select">
									<option value="">(select one)</option>
									<option value="In person">In Person</option>
									<option value="Online">Online</option>
								</select>
							</label>
							<label>
								What is the price of your event?
								<input type="text" name="price" placeholder="0" />
							</label>
						</div>
						<hr />
						<div id="event-date-time">
							<label>
								When does your event start?
								<input
									type="text"
									name="startDate"
									placeholder="MM/DD/YYYY, HH/mm AM"
								/>
								<FaCalendarAlt />
							</label>
							<label>
								When does your event end?
								<input
									type="text"
									name="endDate"
									placeholder="MM/DD/YYYY, HH/mm PM"
								/>
								<FaCalendarAlt />
							</label>
						</div>
						<hr />
						<div id="event-image">
							<label>
								Please add an image url for your event below:
								<input
									type="text"
									name="previewImage"
									placeholder="Image URL"
								/>
							</label>
						</div>
						<hr />
						<div id="event-description">
							<label>
								Please describe your event
								<textarea
									name="description"
									id="description"
									placeholder="Please include at least 30 characters."
								></textarea>
							</label>
						</div>
						<div id="create-event">
							<button type="submit">Create Event</button>
						</div>
					</fetcher.Form>
				</div>
			) : (
				<h1>Please log in to create an event!</h1>
			)}
		</div>
	);
};

export default CreateEvent;
