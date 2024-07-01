const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
	Group,
	Membership,
	User,
	Venue,
	sequelize,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op } = require("sequelize");

const router = express.Router();

router.put("/:venueId", requireAuth, async (req, res) => {
	const { user } = req;
	const venueId = +req.params.venueId;
	const { address, city, state, lat, lng } = req.body;

	let venue;
	try {
		venue = await Venue.findByPk(venueId);
	} catch (error) {
		res.status(404);
		res.json({ message: "Group couldn't be found" });
	}

	if (venue) {
		const group = await Group.findByPk(venue.groupId);
		if (group.organizerId === user.id) {
			try {
				if (!address) venue.address = address;
				if (!city) venue.city = city;
				if (!state) venue.state = state;
				if (lat) venue.lat = lat;
				if (lng) venue.lng = lng;

				await venue.validate();
				await venue.save();

				res.json(venue);
			} catch (error) {
				let errorObj = { message: "Bad Request", errors: {} };
				for (let err of error.errors) {
					errorObj.errors[err.path] = err.message;
				}
				res.statusCode = 400;
				res.json(errorObj);
			}
		} else {
			let status = await Membership.findOne({
				where: {
					groupId: group.id,
					userId: user.id,
				},
			});
			if (status) {
				if (status.status === "co-host") {
					try {
						if (!address) venue.address = address;
						if (!city) venue.city = city;
						if (!state) venue.state = state;
						if (lat) venue.lat = lat;
						if (lng) venue.lng = lng;

						await venue.validate();
						await venue.save();

						res.json(venue);
					} catch (error) {
						let errorObj = { message: "Bad Request", errors: {} };
						for (let err of error.errors) {
							errorObj.errors[err.path] = err.message;
						}
						res.statusCode = 400;
						res.json(errorObj);
					}
				} else {
					res.status(403);
					return res.json({
						message: "User does not have valid permissions",
					});
				}
			} else {
				res.status(403);
				return res.json({
					message: "User does not have valid permissions",
				});
			}
		}
      } else {
            res.status(404);
		res.json({ message: "Venue couldn't be found" }); 
      }
});

module.exports = router;
