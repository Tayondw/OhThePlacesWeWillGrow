import { useLoaderData, useFetcher } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./CreateEvent.css";

const CreateEvent = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const { groupDetail } = useLoaderData();
	let fetcher = useFetcher();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [price, setPrice] = useState("");
	const [previewImage, setPreviewImage] = useState("");
	const [type, setType] = useState("");
	const [errors, setErrors] = useState({});

	const id = groupDetail.id;
	const capacity = 10;
	const venueId = 1;

	const onSubmit = async (event) => {
		event.preventDefault();
		const today = new Date();
		const errs = {};
		if (!name.length) errs.name = "Name is required";
		if (name.length < 5) errs.name = "Name must be at least 5 characters";
		if (description.length < 30)
			errs.description = "Description must be at least 30 characters";
		if (!type)
			errs.type =
				"Event Type is required: Event Type must be Online or In person";
		if (!price) errs.price = "Price is required";
		if (!startDate) {
			errs.startDate = "Event start is required";
		} else {
			const start = new Date(startDate);
			if (isNaN(start.getTime())) {
				errs.startDate = "Invalid start date";
			} else if (start < today) {
				errs.startDate = "Start date must be after or on the current date";
			}
		}
		if (!endDate) {
			errs.endDate = "Event end is required";
		} else {
			const end = new Date(endDate);
			if (isNaN(end.getTime())) {
				errs.endDate = "Invalid end date";
			} else if (end < today) {
				errs.endDate = "End date must be after or on the current date";
			}
		}
		if (startDate && endDate) {
			const start = new Date(startDate);
			const end = new Date(endDate);
			if (start > end) {
				errs.startDate =
					"Event start date/ time must be before the end date/ time";
			}
		}
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
			fetcher.submit(
				{
					name,
					description,
					type,
					price,
					startDate,
					endDate,
					previewImage,
					id,
					capacity,
					venueId,
				},
				{ method: "post", action: "/events" }
			);
		}
	};
	const formatDate = (date) => {
		if (!date) return;

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return `${year}-${month}-${day}T${hours}:${minutes}`;
	};

	// console.log("CHECK ALL GROUP EVENTS", groupEvents);
	// console.log("CHECK ALL GROUP DETAILS", groupDetail);
	// console.log("CHECK ALL GROUP MEMBERS", groupMembers);

	return (
		<div id="new-event">
			{sessionUser && groupDetail ? (
				<div id="events-section-1">
					<h1>Create an event for {groupDetail.name}</h1>
					<fetcher.Form
						method="post"
						action="/events"
						className="create-event"
						onSubmit={onSubmit}
					>
						<div id="name-input">
							<label>
								What is the name of your event?
								<input
									id="event-name-input"
									type="text"
									name="name"
									placeholder="Event Name"
									value={name}
									onChange={(event) => setName(event.target.value)}
								/>
							</label>
							{errors.name && (
								<p style={{ color: "red" }} className="errors">
									{errors.name}
								</p>
							)}
						</div>
						<hr />
						<div id="event-status">
							<label>
								Is this an in-person or online group?
								<select
									name="type"
									id="event-privacy-select"
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
							<label>
								What is the price of your event?
								<input
									id="event-price-select"
									type="number"
									min="1"
									step="any"
									name="price"
									placeholder="0"
									value={price}
									onChange={(event) => setPrice(event.target.value)}
								/>
							</label>
							{errors.price && (
								<p style={{ color: "red" }} className="errors">
									{errors.price}
								</p>
							)}
						</div>
						<hr />
						<div id="event-date-time">
							<label>
								When does your event start?
								<input
									id="event-startDate-select"
									type="datetime-local"
									name="startDate"
									value={startDate ? formatDate(new Date(startDate)) : ""}
									onChange={(event) =>
										setStartDate(new Date(event.target.value))
									}
								/>
							</label>
							{errors.startDate && (
								<p style={{ color: "red" }} className="errors">
									{errors.startDate}
								</p>
							)}
							<label>
								When does your event end?
								<input
									id="event-endDate-select"
									type="datetime-local"
									name="endDate"
									value={endDate ? formatDate(new Date(endDate)) : ""}
									onChange={(event) => setEndDate(new Date(event.target.value))}
								/>
							</label>
							{errors.endDate && (
								<p style={{ color: "red" }} className="errors">
									{errors.endDate}
								</p>
							)}
						</div>
						<hr />
						<div id="event-image">
							<label>
								Please add an image url for your event below:
								<input
									id="event-url"
									type="text"
									name="previewImage"
									placeholder="Image URL"
									value={previewImage}
									onChange={(event) => setPreviewImage(event.target.value)}
								/>
							</label>
							{errors.previewImage && (
								<p style={{ color: "red" }} className="errors">
									{errors.previewImage}
								</p>
							)}
						</div>
						<hr />
						<div id="event-description">
							<label>
								Please describe your event:
								<textarea
									name="description"
									id="event-description-textarea"
									placeholder="Please include at least 30 characters."
									value={description}
									onChange={(event) => setDescription(event.target.value)}
								></textarea>
							</label>
							{errors.description && (
								<p style={{ color: "red" }} className="errors">
									{errors.description}
								</p>
							)}
						</div>
						<div id="create-event">
							<button type="submit" id="create-group-submit">
								Create Event
							</button>
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
