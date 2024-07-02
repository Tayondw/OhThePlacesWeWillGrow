const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
	Group,
	EventImage,
	Membership,
	User,
	Event,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op } = require("sequelize");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
      const imageId = +req.params.imageId;
	let eventImage;
	try {
		eventImage = await EventImage.findByPk(+req.params.imageId);
	} catch (error) {
		res.status(400);
		return res.json({
			message: "Invalid image id requested",
			val: { raw: req.params.imageId, parsed: imageId },
		});
	}
	if (eventImage) {
		// console.log(eventImage.toJSON());
		const event = await Event.findByPk(eventImage.eventId);
		const group = await Group.findByPk(event.groupId);
		const { user } = req;
		const membership = await Membership.findOne({
			where: {
				groupId: group.id,
				userId: user.id,
			},
		});

		const isHost = group.organizerId === user.id;
		const isCoHost = membership ? membership.status === "co-host" : false;
		if (isHost || isCoHost) {
			await eventImage.destroy();
			res.json({ message: "Successfully deleted" });
		} else {
			res.status(403);
			res.json({
				message:
					"Necessary role not assigned. Must be Organizer or Co-host of the group",
			});
		}
	} else {
		res.status(404);
		res.json({ message: "Event Image couldn't be found" });
	}

	// let imageId = +req.params.imageId;
	// let image;
	// try {
	// 	image = await EventImage.findByPk(imageId);
	// } catch (error) {
	// 	res.status(400);
	// 	res.json({
	// 		message: "Invalid image id requested",
	// 		val: { raw: req.params.imageId, parsed: imageId },
	// 	});
	// }
	// if (image) {
	// 	// console.log(image.toJSON());
	// 	const event = await Event.findByPk(image.eventId);
	// 	const group = await Group.findByPk(event.groupId);
	// 	const { user } = req;
	// 	const membership = await Membership.findOne({
	// 		where: {
	// 			groupId: group.id,
	// 			userId: user.id,
	// 		},
	// 	});

	// 	const organizer = group.organizerId === user.id;
	// 	const coHost = membership ? membership.status === "co-host" : false;
	// 	if (organizer || coHost) {
	// 		await image.destroy();
	// 		res.json({ message: "Successfully deleted" });
	// 	} else {
	// 		res.status(403);
	// 		res.json({
	// 			message:
	// 				"User must be the organizer or 'co-host' of the Group that the Event belongs to",
	// 		});
	// 	}
	// } else {
	// 	res.status(404);
	// 	res.json({ message: "Event Image couldn't be found" });
	// }
});

module.exports = router;
