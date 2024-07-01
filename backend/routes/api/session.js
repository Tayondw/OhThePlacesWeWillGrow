const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { User } = require("../../db/models");

const router = express.Router();

const validateLogin = [
	check("credential")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Email or username is required"),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Password is required"),
	handleValidationErrors,
];

// Restore session user
router.get("/", (req, res) => {
	const { user } = req;
	if (user) {
		const safeUser = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			username: user.username,
		};
		return res.json({
			user: safeUser,
		});
	} else return res.json({ user: null });
});

router.post("/", validateLogin, async (req, res, next) => {
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
			message: "Invalid credentials",
		};
		return next(error);
	}

	const safeUser = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		username: user.username,
	};

	await setTokenCookie(res, safeUser);

	return res.json({
		user: safeUser,
	});
});

// Log out
router.delete("/", (_req, res) => {
	res.clearCookie("token");
	return res.json({ message: "success" });
});

module.exports = router;
