"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const users = [
	{
		email: "demo@user.io",
		username: "Demo-lition",
		hashedPassword: bcrypt.hashSync("password"),
		firstName: "demo",
		lastName: "user",
	},
	{
		email: "user1@user.io",
		username: "FakeUser1",
		hashedPassword: bcrypt.hashSync("password2"),
		firstName: "fake",
		lastName: "user",
	},
	{
		email: "user2@user.io",
		username: "FakeUser2",
		hashedPassword: bcrypt.hashSync("password3"),
		firstName: "fake",
		lastName: "user",
	},
	{
		email: "user3@user.io",
		username: "FakeUser3",
		hashedPassword: bcrypt.hashSync("password4"),
		firstName: "faker",
		lastName: "user",
	},
	{
		email: "user4@user.io",
		username: "FakeUser4",
		hashedPassword: bcrypt.hashSync("password5"),
		firstName: "fake",
		lastName: "user",
	},
	{
		email: "user5@user.io",
		username: "FakeUser5",
		hashedPassword: bcrypt.hashSync("password6"),
		firstName: "fake",
		lastName: "user",
	},
	{
		email: "john1@user.io",
		username: "JohnDoe",
		hashedPassword: bcrypt.hashSync("password7"),
		firstName: "John",
		lastName: "Doe",
	},
	{
		email: "john2@user.io",
		username: "JohnDoe2",
		hashedPassword: bcrypt.hashSync("password8"),
		firstName: "John",
		lastName: "Doe",
	},
	{
		email: "john3@user.io",
		username: "JohnDoe3",
		hashedPassword: bcrypt.hashSync("password9"),
		firstName: "John",
		lastName: "Doe",
	},
	{
		email: "john4@user.io",
		username: "JohnDoe4",
		hashedPassword: bcrypt.hashSync("password10"),
		firstName: "John",
		lastName: "Doe",
	},
	{
		email: "john5@user.io",
		username: "JohnDoe5",
		hashedPassword: bcrypt.hashSync("password11"),
		firstName: "John",
		lastName: "Doe",
	},
	{
		email: "jane1@user.io",
		username: "JaneDoe1",
		hashedPassword: bcrypt.hashSync("password12"),
		firstName: "Jane",
		lastName: "Doe",
	},
	{
		email: "jane2@user.io",
		username: "JaneDoe2",
		hashedPassword: bcrypt.hashSync("password13"),
		firstName: "Jane",
		lastName: "Doe",
	},
	{
		email: "jane3@user.io",
		username: "JaneDoe3",
		hashedPassword: bcrypt.hashSync("password14"),
		firstName: "Jane",
		lastName: "Doe",
	},
	{
		email: "jane4@user.io",
		username: "JaneDoe4",
		hashedPassword: bcrypt.hashSync("password15"),
		firstName: "Jane",
		lastName: "Doe",
	},
	{
		email: "jane5@user.io",
		username: "JaneDoe5",
		hashedPassword: bcrypt.hashSync("password16"),
		firstName: "Jane",
		lastName: "Doe",
	},
	{
		email: "academy1@user.io",
		username: "Academy1",
		hashedPassword: bcrypt.hashSync("password17"),
		firstName: "App",
		lastName: "Academy",
	},
	{
		email: "academy2@user.io",
		username: "Academy2",
		hashedPassword: bcrypt.hashSync("password18"),
		firstName: "App",
		lastName: "Academy",
	},
	{
		email: "academy3@user.io",
		username: "Academy3",
		hashedPassword: bcrypt.hashSync("password19"),
		firstName: "App",
		lastName: "Academy",
	},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await User.bulkCreate(users, { ...options, validate: true });
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		let usernames = [];

		for (let user of users) {
			usernames.push(user.username);
		}
		// options.tableName = "Users";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"Users",
			{
				username: {
					[Op.in]: usernames,
				},
			},
			options
			// {
			// 	username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
			// },
			// {}
		);
	},
};
