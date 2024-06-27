const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
	Event,
	Group,
	GroupImage,
	Membership,
	User,
	Venue,
	EventImage,
	Attendance,
	sequelize,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op } = require("sequelize");

const router = express.Router();

router.get("/", async (req, res, next) => {
	// want to try a different way and see if this works
	const events = await Event.findAll({
		attributes: {
			include: [
				[
					sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM Attendances AS Attendance
                  WHERE
                    Attendance.eventId = Event.id AND
                    Attendance.status = 'attending')`),
					"numAttending",
				],
				[
					sequelize.literal(`(
                                    SELECT url
                                    FROM EventImages AS EventImage
                                    WHERE
                                      EventImage.eventId = Event.id
                                    LIMIT 1
                                  )`),
					"previewImage",
				],
			],
		},
		include: [
			{
				model: Group,
				attributes: ["id", "name", "city", "state"],
			},
			{
				model: Venue,
				attributes: ["id", "city", "state"],
			},
		],
	});

	return res.json({
		Events: events,
	});
});

router.get("/:eventId", async (req, res) => {
	const eventId = +req.params.eventId;

	let event;
	try {
		event = await Event.findByPk(eventId);
	} catch (error) {
		res.status(404);
		res.json({
			message: "Event couldn't be found",
		});
	}

	if (event) {
		const events = await Event.findByPk(eventId, {
			attributes: {
				include: [
					[
						sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM Attendances AS Attendance
                  WHERE
                    Attendance.eventId = Event.id AND
                    Attendance.status = 'attending')`),
						"numAttending",
					],
					[
						sequelize.literal(`(
                                    SELECT url
                                    FROM EventImages AS EventImage
                                    WHERE
                                      EventImage.eventId = Event.id
                                    LIMIT 1
                                  )`),
						"previewImage",
					],
				],
			},
			include: [
				{
					model: Group,
					attributes: ["id", "name", "city", "state"],
				},
				{
					model: Venue,
					attributes: ["id", "city", "state"],
				},
				{
					model: EventImage,
					attributes: ["id", "url", "preview"],
				},
			],
		});

		return res.json({
			Events: events,
		});
	} else {
		res.status(404);
		res.json({
			message: "Event couldn't be found",
		});
	}
});

router.get("/:eventId/attendees", async (req, res) => {
	const { user } = req;
	const eventId = +req.params.eventId;
	let event;

	try {
		event = await Event.findByPk(eventId);
		if (!event) {
			res.status(404);
			res.json({
				message: "Event couldn't be found",
			});
		}
		const group = await Group.findByPk(event.groupId);
		let attendees;
		if (user) {
			const membership = await Membership.findOne({
				where: {
					userId: user.id,
					groupId: group.id,
				},
			});
			const organizer = group.organizerId === user.id;
			const coHost = membership ? membership.status === "co-host" : false;

			if (organizer || coHost) {
				attendees = await Attendance.findAll({
					include: {
						model: User,
						attributes: ["id", "firstName", "lastName"],
					},
					where: {
						eventId: event.id,
					},
					order: [[User, "id", "ASC"]],
				});
			} else {
				attendees = await Attendance.findAll({
					include: {
						model: User,
						attributes: ["id", "firstName", "lastName"],
					},
					where: {
						eventId: event.id,
						status: {
							[Op.not]: ["pending"],
						},
					},
					order: [[User, "id", "ASC"]],
				});
			}
		} else {
			attendees = await Attendance.findAll({
				include: {
					model: User,
					attributes: ["id", "firstName", "lastName"],
				},
				where: {
					eventId: event.id,
					status: {
						[Op.not]: ["pending"],
					},
				},
				order: [[User, "id", "ASC"]],
			});
		}

		const Attendees = attendees.map((attendee) => ({
			id: attendee.User.id,
			firstName: attendee.User.firstName,
			lastName: attendee.User.lastName,
			Attendance: {
				status: attendee.status,
			},
		}));
		res.json({
			Attendees,
		});
	} catch (error) {
		res.status(404);
		res.json({
			message: "Event couldn't be found",
		});
	}
});

router.post("/:eventId/images", requireAuth, async (req, res) => {
	const { user } = req;
	const eventId = +req.params.eventId;
	const { url, preview } = req.body;

	let event;
	try {
		event = await Event.findByPk(eventId, {
			include: {
				model: EventImage,
			},
		});
	} catch (error) {
		res.status(404);
		res.json({
			message: "Event couldn't be found",
		});
	}

	if (event) {
		const attendee = await Attendance.findOne({
			where: {
				eventId: event.id,
				userId: user.id,
			},
		});

		const attending = attendee ? attendee.status === "attending" : false;

		if (attending) {
			const newImage = await EventImage.create(
				{
					url: url,
					preview: preview,
					eventId: event.id,
				},
				{ validate: true }
			);

			newImage.save();
			res.status(200);
			res.json(newImage);
		} else {
			res.status(403);
			res.json({
				message: "User must be attending the event",
			});
		}
	} else {
		res.status(404);
		res.json({
			message: "Event couldn't be found",
		});
	}
});

router.post("/:eventId/attendance", requireAuth, async (req, res) => {
	const { user } = req;
	const eventId = +req.params.eventId;
	let event;

	try {
		event = await Event.findByPk(eventId);
	} catch (error) {
		res.status(404);
		return res.json({
			message: "Event couldn't be found",
		});
	}
	if (event) {
		const attendance = await Attendance.findOne({
			where: {
				userId: user.id,
				eventId: event.id,
			},
		});
		if (attendance) {
			if (attendance.status === "attending") {
				res.status(400);
				res.json({
					message: "User is already an attendee of the event",
				});
			} else {
				res.status(400);
				res.json({
					message: "Attendance has already been requested",
				});
			}
		} else {
			const group = await Group.findByPk(event.groupId);
			const membership = await Membership.findOne({
				where: {
					userId: user.id,
					status: {
						[Op.in]: ["member", "co-host"],
					},
				},
			});
			if (!membership && user.id !== group.organizerId) {
				res.status(403);
				return res.json({
					message: "Not a member of the group",
				});
			}

			const attend = await Attendance.create(
				{
					userId: user.id,
					status: "pending",
					eventId: event.id,
				},
				{ validate: true }
			);

			await attend.save();

			const pending = {
				userId: attend.userId,
				status: attend.status,
			};

			res.json(pending);
		}
	} else {
		res.status(404);
		res.json({
			message: "Event couldn't be found",
		});
	}
});

router.put("/:eventId", requireAuth, async (req, res) => {
	const { user } = req;
	const eventId = +req.params.eventId;
	const {
		venueId,
		name,
		type,
		capacity,
		price,
		description,
		startDate,
		endDate,
	} = req.body;

	let event;

	try {
		event = await Event.findByPk(eventId);
	} catch (error) {
		res.status(404);
		res.json({
			message: "Event couldn't be found",
		});
	}

	if (event) {
		let group;
		try {
			group = await Group.findByPk(+event.groupId);
		} catch (error) {
			res.status(404);
			res.json({
				message: "Group couldn't be found",
			});
		}
		if (group) {
			if (group.organizerId === user.id) {
				try {
					let venue;
					venue = await Venue.findByPk(venueId);
					if (venueId) venue = await Venue.findByPk(venueId);
					if (venue === null) {
						res.status(404);
						res.json({
							message: "Venue couldn't be found",
						});
					}

					const newEvent = await Event.create({
						venueId: venueId,
						name: name,
						type: type,
						capacity: capacity,
						price: price,
						description: description,
						startDate,
						startDate,
						endDate: endDate,
						groupId: group.id,
					});

					await newEvent.save();

					const safeEvent = {
						id: newEvent.id,
						venueId: newEvent.venueId,
						name: newEvent.name,
						type: newEvent.type,
						capacity: newEvent.capacity,
						price: newEvent.price,
						description: newEvent.description,
						private: newEvent.private,
						startDate: newEvent.startDate,
						endDate: newEvent.startDate,
						groupId: newEvent.groupId,
					};

					res.status(200);
					res.json(safeEvent);
				} catch (error) {
					let errorObj = { message: "Bad Request", errors: {} };
					for (let err of error.errors) {
						errorObj.errors[err.path] = err.message;
					}
					res.status(400);
					res.json(errorObj);
				}
			} else {
				let memberStatus = await Membership.findOne({
					where: {
						groupId: group.id,
						userId: user.id,
					},
				});

				if (memberStatus) {
					if (memberStatus.status === "co-host") {
						try {
							let venue;
							venue = await Venue.findByPk(venueId);
							if (venueId) venue = await Venue.findByPk(venueId);
							if (venue === null) {
								res.status(404);
								res.json({
									message: "Venue couldn't be found",
								});
							}

							const newEvent = await Event.create({
								venueId: venueId,
								name: name,
								type: type,
								capacity: capacity,
								price: price,
								description: description,
								startDate,
								startDate,
								endDate: endDate,
								groupId: group.id,
							});

							await newEvent.save();

							const safeEvent = {
								id: newEvent.id,
								venueId: newEvent.venueId,
								name: newEvent.name,
								type: newEvent.type,
								capacity: newEvent.capacity,
								price: newEvent.price,
								description: newEvent.description,
								private: newEvent.private,
								startDate: newEvent.startDate,
								endDate: newEvent.startDate,
								groupId: newEvent.groupId,
							};

							res.status(200);
							res.json(safeEvent);
						} catch (error) {
							let errorObj = { message: "Bad Request", errors: {} };
							for (let err of error.errors) {
								errorObj.errors[err.path] = err.message;
							}
							res.status(400);
							res.json(errorObj);
						}
					} else {
						res.status(403);
						res.json({
							message:
								"User must be a member of the group with the status of 'co-host'",
						});
					}
				} else {
					res.status(403);
					res.json({
						message: "User must be organizer of the group",
					});
				}
			}
		} else {
			res.status(404);
			res.json({
				message: "Group couldn't be found",
			});
		}
	} else {
		res.status(404);
		res.json({
			message: "Event couldn't be found",
		});
	}
});

router.delete("/:eventId", requireAuth, async (req, res) => {
	const { user } = req;
	const eventId = +req.params.eventId;
	let event;

	try {
		event = await Event.findByPk(eventId);
	} catch (error) {
		res.status(404);
		return res.json({ message: "Event couldn't be found" });
	}
	if (event) {
		const group = await Group.findByPk(event.groupId);
		const membership = await Membership.findOne({
			where: {
				groupId: group.id,
				userId: user.id,
			},
		});

		const organizer = group.organizerId === user.id;
		const coHost = membership ? membership.status === "co-host" : false;
		if (organizer || coHost) {
			await event.destroy();
			res.json({
				message: "Successfully deleted",
			});
		} else {
			res.status(403);
			res.json({
				message:
					"User must be the organizer or 'co-host' of the Group that the Event belongs to",
			});
		}
	} else {
		res.status(404);
		res.json({ message: "Event couldn't be found" });
	}
});

module.exports = router;
