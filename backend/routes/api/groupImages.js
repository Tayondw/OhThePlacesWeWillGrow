const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Group, GroupImage, Membership, User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op } = require("sequelize");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
	const imageId = +req.params.imageId;
	let image;

	try {
		image = await GroupImage.findByPk(imageId);
	} catch (error) {
		res.status(400);
		return res.json({
			message: "Invalid image id requested",
			val: { raw: req.params.imageId, parsed: imageId },
		});
	}

	if (image) {
		const group = await Group.findByPk(+image.groupId);
		const { user } = req;

		const membership = await Membership.findOne({
			where: {
				userId: user.id,
				groupId: group.id,
			},
		});
		const organizer = group.organizerId === user.id;
		const coHost = membership ? membership.status === "co-host" : false;

		if (organizer || coHost) {
			await image.destroy();
			res.json({ message: "Successfully deleted" });
		} else {
			res.status(403);
			res.json({
				message: "User must be the organizer or 'co-host' of the Group",
			});
		}
	} else {
		res.status(404);
		res.json({ message: "Group Image couldn't be found" });
	}
});

module.exports = router;
