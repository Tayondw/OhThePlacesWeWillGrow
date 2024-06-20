const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

router.post("/", async (req, res, next) => {
	const { credential, password } = req.body;
	const user = await User.unscoped().findOne({
		where: {
			[Op.or]: {
				username: credential,
				email: credential,
			},
		},
	});

	if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
		const error = new Error("Login failed");
		error.status = 401;
		error.title = "Login failed";
		error.errors = {
			credential: "The provided credentials were invalid.",
		};
		return next(error);
	}

	const safeUser = {
		id: user.id,
		email: user.email,
		username: user.username,
	};

	await setTokenCookie(res, safeUser);

	return res.json({
		user: safeUser,
	});
});

module.exports = router;
