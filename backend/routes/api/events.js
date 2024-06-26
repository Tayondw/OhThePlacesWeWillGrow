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

module.exports = router;
