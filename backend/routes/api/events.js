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
	let { page, size, name, type, startDate } = req.query;

	page = +page;
	size = +size;

	const errors = {};

	if (page <= 0) errors.page = "Page must be greater than or equal to 1";
	if (size <= 0) errors.size = "Size must be greater than or equal to 1";

	if (isNaN(page) || !page) page = 1;
	if (isNaN(size) || !size) size = 20;

	const pagination = {};
	pagination.limit = size;
	pagination.offset = size * (page - 1);

	const where = {};

	if (name) {
		if (typeof name !== "string") {
			errors.name = "Name must be a string";
		} else {
			where.name = {
				[Op.like]: `${name}`,
			};
		}
	}

	if (type) {
		if (type !== "Online" && type !== "In person") {
			errors.type = "Type must be 'Online' or 'In Person'";
		} else {
			where.type = type;
		}
	}

	if (startDate) {
		let date = new Date(startDate);
		if (isNaN(date)) {
			errors.startDate = "Start date must be a valid datetime";
		} else {
			where.startDate = {
				[Op.gte]: date,
			};
		}
	}

	const allErrors = Object.keys(errors);

	if (allErrors.length) {
		res.status(400);
		res.json({
			message: "Bad Request",
			errors: {
				...errors,
			},
		});
	}

	const events = await Event.findAll({
		where,
		...pagination,
	});

	let result = [];

	for (let event of events) {
		let image = await EventImage.findOne({
			where: {
				eventId: event.id,
				preview: true,
			},
		});

		let group = await Group.findByPk(event.groupId, {
			attributes: ["id", "name", "city", "state"],
		});
		let venue = await Venue.findByPk(event.venueId, {
			attributes: ["id", "city", "state"],
		});

		let numAttending = await Attendance.count({
			where: {
				status: {
					[Op.in]: ["attending"],
				},
				eventId: event.id,
			},
		});

		let safeEvent = {
			id: event.id,
			groupId: event.groupId,
			venueId: venue ? venue.id : null,
			name: event.name,
			description: event.description,
			type: event.type,
			startDate: event.startDate,
			endDate: event.endDate,
			numAttending,
			previewImage: image ? image.url : null,
			Group: group,
			Venue: venue ? venue : null,
		};

		result.push(safeEvent);
	}

	return res.json({
		Events: result,
		page,
		size,
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
		let image = await EventImage.findAll({
			where: {
				eventId: event.id,
			},
		});

		let group = await Group.findByPk(event.groupId, {
			attributes: ["id", "name", "city", "state"],
		});
		let venue = await Venue.findByPk(event.venueId, {
			attributes: ["id", "city", "state"],
		});

		let numAttending = await Attendance.count({
			where: {
				status: {
					[Op.in]: ["attending"],
				},
				eventId: event.id,
			},
		});

		let safeEvent = {
			id: event.id,
			groupId: event.groupId,
			venueId: venue ? venue.id : null,
			name: event.name,
			description: event.description,
			type: event.type,
			capacity: event.capacity,
			price: event.price,
			startDate: event.startDate,
			endDate: event.endDate,
			numAttending,
			Group: group,
			Venue: venue ? venue : null,
			EventImages: image,
		};

		res.json(safeEvent);
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
		event = await Event.findByPk(eventId);
	} catch (error) {
		res.status(404);
		res.json({
			message: "Event couldn't be found",
		});
	}

	if (event) {
		const attendeeStatus = await Attendance.findOne({
			where: {
				eventId: event.id,
				userId: user.id,
			},
		});

		const attending = attendeeStatus
			? attendeeStatus.status === "attending" ||
			  attendeeStatus.status === "co-host"
			: false;

		if (attending) {
			try {
				if (preview === true) {
					let oldImage = await EventImage.findOne({
						where: {
							eventId: event.id,
							preview: true,
						},
					});

					if (oldImage) {
						oldImage.preview = false;
						await oldImage.validate();
						await oldImage.save();
					}
				}
				const newImage = await EventImage.create(
					{
						url: url,
						preview: preview,
						eventId: event.id,
					},
					{ validate: true }
				);

				newImage.save();
				const safeImage = {
					url: newImage.url,
					preview: newImage.preview,
				};
				// res.status(200);
				res.json(safeImage);
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

router.put("/:eventId/attendance", requireAuth, async (req, res) => {
	const { user } = req;
	let { userId, status } = req.body;
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
		const group = await Group.findByPk(event.groupId);

		const organizer = group.organizerId === user.id;
		const membership = await Membership.findOne({
			where: {
				userId: user.id,
				groupId: group.id,
			},
		});
		const coHost = membership ? membership.status === "co-host" : false;
		if (organizer || coHost) {
			const attendance = await Attendance.findOne({
				where: {
					userId: userId,
					eventId: event.id,
				},
			});
			if (attendance) {
				const numAttending = await Attendance.count({
					where: {
						eventId: event.id,
					},
				});
				if (status !== "pending" && numAttending < event.capacity) {
					if (attendance.status === "pending") {
						attendance.status = status;
						await attendance.validate();
						await attendance.save();
						res.json({
							id: attendance.id,
							eventId: event.id,
							userId: attendance.userId,
							status: attendance.status,
						});
					} else {
						res.status(400);
						res.json({
							message: "User is already attending event",
						});
					}
				} else {
					if (attendance.status === "pending") {
						attendance.status = status;
						await attendance.validate();
						await attendance.save();
						res.json({
							id: attendance.id,
							eventId: event.id,
							userId: attendance.id,
							status: attendance.status,
						});
					} else {
						res.status(400);
						res.json({ message: "User is already attending" });
					}
					if (status === "pending") {
						res.status(400);
						res.json({
							message: "Cannot change an attendance status to pending",
						});
					} else {
						res.status(400);
						res.json({
							message: "Invalid status was sent. May be at capacity",
						});
					}
				}
			} else {
				res.status(404);
				res.json({
					message: "Attendance between the user and the event does not exist",
				});
			}
		} else {
			res.status(403);
			res.json({
				message:
					"User must be the organizer or have a membership status to the group with the status of 'co-host'",
			});
		}
	} else {
		res.status(404);
		res.json({ message: "Event couldn't be found" });
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

router.delete("/:eventId/attendance/:userId", requireAuth, async (req, res) => {
	const { user } = req;
	const eventId = +req.params.eventId;
	const userId = +req.params.userId;
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
		const group = await Group.findByPk(event.groupId);
		const organizer = group.organizerId === user.id;
		try {
			const verifyExist = await User.findByPk(userId);
			if (!verifyExist) {
				res.status(404);
				return res.json({
					message: "User couldn't be found",
				});
			}
		} catch (error) {
			res.status(404);
			return res.json({
				message: "User couldn't be found",
			});
		}
		const verifyUser = userId === user.id;
		if (organizer || verifyUser) {
			const attendance = await Attendance.findOne({
				where: {
					userId: userId,
					eventId: event.id,
				},
			});
			if (attendance) {
				await attendance.destroy();
				res.json({
					message: "Successfully deleted attendance from event",
				});
			} else {
				res.status(404);
				res.json({
					message: "Attendance does not exist for this User",
				});
			}
		} else {
			res.status(403);
			res.json({
				message:
					"User must be the organizer of the group ot the user whose attendance is being deleted",
			});
		}
	} else {
		res.status(404);
		res.json({
			message: "Event couldn't be found",
		});
	}
});

module.exports = router;
