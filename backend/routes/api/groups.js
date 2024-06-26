const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
	Group,
	GroupImage,
	Membership,
	User,
	Venue,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op } = require("sequelize");

const router = express.Router();

router.get("/", async (req, res, next) => {
	const allGroups = await Group.findAll({
		attributes: [
			"id",
			"organizerId",
			"name",
			"about",
			"type",
			"private",
			"city",
			"state",
			"createdAt",
			"updatedAt",
		],
	});

	let groups = [];

	for (let group of allGroups) {
		let eachGroup = group.toJSON();

		eachGroup.numMembers = await Membership.count({
			where: {
				groupId: eachGroup.id,
				status: {
					[Op.in]: ["member", "co-host"],
				},
			},
		});

		eachGroup.numMembers += 1;

		let image = await GroupImage.findOne({
			where: {
				groupId: eachGroup.id,
				preview: true,
			},
		});

		if (image) {
			eachGroup.previewImage = image.url;
		}

		groups.push(eachGroup);
	}

	return res.json({
		Groups: groups,
	});
});

router.get("/current", requireAuth, async (req, res) => {
	const { user } = req;
	// console.log(user);
	let allGroups = await Group.findAll({
		attributes: [
			"id",
			"organizerId",
			"name",
			"about",
			"type",
			"private",
			"city",
			"state",
			"createdAt",
			"updatedAt",
		],
		where: {
			organizerId: user.id,
		},
	});

	let groups = [];

	for (let group of allGroups) {
		let eachGroup = group.toJSON();

		if (eachGroup) {
			eachGroup.numMembers = await Membership.count({
				where: {
					groupId: eachGroup.id,
					status: {
						[Op.in]: ["member", "co-host"],
					},
				},
			});

			eachGroup.numMembers += 1;

			let image = await GroupImage.findOne({
				where: {
					groupId: eachGroup.id,
					preview: true,
				},
			});

			if (image) {
				eachGroup.previewImage = image.url;
			}
		}

		groups.push(eachGroup);
	}

	return res.json({
		Groups: groups,
	});
});

router.get("/:groupId", async (req, res) => {
	const groupId = req.params.groupId;

	let allGroups;

	try {
		allGroups = await Group.findByPk(groupId, {
			attributes: [
				"id",
				"organizerId",
				"name",
				"about",
				"type",
				"private",
				"city",
				"state",
				"createdAt",
				"updatedAt",
			],
		});
	} catch (error) {
		res.status(404);
		res.json({ message: "Group couldn't be found" });
	}

	if (allGroups) {
		allGroups = allGroups.toJSON();

		allGroups.numMembers = await Membership.count({
			where: {
				groupId: groupId,
				status: {
					[Op.in]: ["member", "co-host"],
				},
			},
		});

		allGroups.numMembers += 1;

		let image = await GroupImage.findAll({
			where: {
				groupId: allGroups.id,
				preview: true,
			},
			attributes: ["id", "url", "preview"],
		});

		allGroups.GroupImages = image;

		allGroups.Organizer = await User.findByPk(groupId, {
			attributes: ["id", "firstName", "lastName"],
		});

            allGroups.Venues = await Venue.findAll({
                  where: {
                        groupId: allGroups.id
                  }
            });
      } else {
            res.status(404);
		res.json({ message: "Group couldn't be found" });
      }

	res.json(allGroups);
});

module.exports = router;
