"use strict";

const { Attendance } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

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
		await Attendance.bulkCreate(
			[
				{
					eventId: 1,
					userId: 2,
					status: "attending",
				},
				{
					eventId: 3,
					userId: 4,
					status: "pending",
				},
				{
					eventId: 5,
					userId: 6,
					status: "pending",
				},
				{
					eventId: 7,
					userId: 8,
					status: "attending",
				},
				{
					eventId: 9,
					userId: 10,
					status: "attending",
				},
				{
					eventId: 10,
					userId: 9,
					status: "pending",
				},
				{
					eventId: 9,
					userId: 8,
					status: "attending",
				},
				{
					eventId: 7,
					userId: 6,
					status: "attending",
				},
				{
					eventId: 5,
					userId: 4,
					status: "attending",
				},
				{
					eventId: 3,
					userId: 2,
					status: "pending",
				},
				{
					eventId: 1,
					userId: 2,
					status: "attending",
                        },
                        {
					eventId: 3,
					userId: 4,
					status: "pending",
                        },
                        {
					eventId: 5,
					userId: 6,
					status: "attending",
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		options.tableName = "Attendances";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
			},
			{}
		);
	},
};
