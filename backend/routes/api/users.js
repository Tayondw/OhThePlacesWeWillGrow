const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
	check("firstName")
		.notEmpty({ checkFalsy: true })
		.withMessage("First Name is required"),
	check("lastName")
		.notEmpty({ checkFalsy: true })
		.withMessage("Last Name is required"),
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Invalid email"),
	check("username")
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage("Username is required"),
	check("username").not().isEmail().withMessage("Username cannot be an email."),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
	const { firstName, lastName, email, password, username } = req.body;
	const hashedPassword = bcrypt.hashSync(password);

	try {
		let searchCheck = await User.findOne({
			where: {
				email,
			},
		});

		if (!searchCheck) {
			searchCheck = await User.findOne({
				where: {
					username,
				},
			});
		} else {
			searchCheck = await User.findOne({
				where: {
					username,
				},
			});
			if (searchCheck) {
				res.status(500);
				return res.json({
					message: "User already exists",
					errors: {
						email: "User with that email already exists",
						username: "User with that username already exists",
					},
				});
			} else {
				res.status(500);
				return res.json({
					message: "User already exists",
					errors: {
						email: "User with that email already exists",
					},
				});
			}
		}

		if (searchCheck) {
			res.status(500);
			return res.json({
				message: "User already exists",
				errors: {
					username: "User with that username already exists",
				},
			});
		}

		const user = await User.create({
			firstName,
			lastName,
			email,
			username,
			hashedPassword,
		});

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
      } catch (error) {
		res.status(400);
		res.json({
			message: "Bad Request",
			errors: error,
		});
	}
});

module.exports = router;
