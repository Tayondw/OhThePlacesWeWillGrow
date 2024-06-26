const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
	Group,
	GroupImage,
	Membership,
	User,
	Venue,
	sequelize,
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
	const groupId = +req.params.groupId;
	let groups;
	try {
		groups = await Group.findByPk(groupId, {
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
		res.json({
			message: "Group couldn't be found",
		});
	}

	if (groups) {
		groups = await Group.findByPk(groupId, {
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
			include: [
				{
					model: Membership,
					attributes: [
						"groupId",
						[sequelize.fn("COUNT"), sequelize.col("groupId")],
					],
					status: {
						[Op.in]: ["member", "co-host"],
					},
					as: "numMembers",
				},
				{
					model: GroupImage,
					attributes: ["id", "url", "preview"],
				},
				{
					model: User,
					attributes: ["id", "firstName", "lastName"],
					as: "Organizer",
				},
				{
					model: Venue,
					where: {
						groupId: groupId,
					},
				},
			],
		});
		groups = groups.toJSON();
		groups.numMembers = groups.numMembers[0].groupId;

		res.json(groups);
	} else {
		res.status(404);
		res.json({
			message: "Group couldn't be found",
		});
	}
});

router.post("/", requireAuth, async (req, res) => {
	const { user } = req;

	const { name, about, type, private, city, state } = req.body;

	try {
		const newGroup = await Group.create(
			{
				organizerId: user.id,
				name,
				about,
				type,
				private,
				city,
				state,
			},
			{ validate: true }
		);

		await newGroup.save();
		res.status(201);
		res.json(newGroup);
	} catch (error) {
		let errorObj = { message: "Bad Request", errors: {} };
		// console.log(error.errors);
		for (let err of error.errors) {
			// console.log(err.path);
			errorObj.errors[err.path] = err.message;
		}
		// console.log(errorObj);
		res.status(400);
		res.json(errorObj);
	}
});

router.post("/:groupId/images", requireAuth, async (req, res) => {
	const { user } = req;
	const groupId = +req.params.groupId;
	const { url, preview } = req.body;

	let group;
	try {
		group = await Group.findByPk(groupId, {
			include: {
				model: GroupImage,
			},
		});
	} catch (error) {
		res.status(404);
		res.json({
			message: "Group couldn't be found",
		});
	}

	if (user.id !== group.organizerId) {
		res.status(403);
		return res.json({
			message: "Must be organizer of the group in order to add or change image",
		});
	}

	const newImage = await GroupImage.create(
		{
			url: url,
			preview: preview,
			groupId: group.id,
		},
		{ validate: true }
	);

	await newImage.save();
	res.status(200);
	res.json(newImage);
});

router.put("/:groupId", requireAuth, async (req, res) => {
	const { user } = req;
	const groupId = +req.params.groupId;
	const { name, about, type, private, city, state } = req.body;

	let group = await Group.findByPk(groupId);
	if (group && group.organizerId === user.id) {
		try {
			if (name) group.name = name;
			if (about) group.about = about;
			if (type) group.type = type;
			if (private !== undefined) group.private = private;
			if (!city) group.city = city;
			if (!state) group.state = state;

			await group.validate();
			await group.save();

			res.json(group);
		} catch (error) {
			let errorObj = { message: "Bad Request", errors: {} };
			for (let err of error.errors) {
				errorObj.errors[err.path] = err.message;
			}
			res.statusCode = 400;
			res.json(errorObj);
		}
	} else {
		if (!group) {
			res.status(404);
			res.json({ message: "Group couldn't be found" });
		} else {
			res.status(403);
			res.json({ message: "Not the owner of this group" });
		}
	}
});

router.delete("/:groupId", requireAuth, async (res, req) => {
	const { user } = req;
      const groupId = +req.params.groupId;
      
      const group = await Group.findByPk(groupId);

	if (group && group.organizerId === user.id) {
		try {
			await group.destroy();
			res.json({
				message: "Successfully deleted",
			});
		} catch (error) {
			let errorObj = { message: "Bad Request", errors: {} };
			for (let err of error.errors) {
				errorObj.errors[err.path] = err.message;
			}
			res.statusCode = 400;
			res.json(errorObj);
		}
	} else {
		if (!group) {
			res.status(404);
			res.json({ message: "Group couldn't be found" });
		} else {
			res.status(403);
			res.json({ message: "Not the owner of this group" });
		}
	}
});

module.exports = router;
