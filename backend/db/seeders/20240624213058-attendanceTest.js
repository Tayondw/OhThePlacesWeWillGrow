"use strict";

const { Attendance } = require("../models");
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const attendees = [
	{
		eventId: 1,
		userId: 1,
		status: "host",
	},
	{
		eventId: 1,
		userId: 2,
		status: "pending",
	},
	{
		eventId: 1,
		userId: 3,
		status: "pending",
	},
	{
		eventId: 1,
		userId: 4,
		status: "attending",
	},
	{
		eventId: 2,
		userId: 5,
		status: "host",
	},
	{
		eventId: 3,
		userId: 5,
		status: "host",
	},
	{
		eventId: 4,
		userId: 6,
		status: "host",
	},
	{
		eventId: 4,
		userId: 5,
		status: "attending",
	},
	{
		eventId: 5,
		userId: 6,
		status: "host",
	},
	{
		eventId: 5,
		userId: 7,
		status: "pending",
	},
	{
		eventId: 6,
		userId: 15,
		status: "host",
	},
	{
		eventId: 10,
		userId: 12,
		status: "host",
	},
	{
		eventId: 9,
		userId: 1,
		status: "host",
      },
      {
		eventId: 11,
		userId: 10,
		status: "attending",
	},{
		eventId: 8,
		userId: 1,
		status: "host",
	},{
		eventId: 5,
		userId: 10,
		status: "pending",
	},{
		eventId: 9,
		userId: 8,
		status: "attending",
	},{
		eventId: 11,
		userId: 13,
		status: "host",
	},{
		eventId: 7,
		userId: 2,
		status: "host",
	},{
		eventId:11,
		userId: 3,
		status: "pending",
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
		await Attendance.bulkCreate(attendees, { ...options, validate: true });
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		let eventIds = [];
		let userIds = [];

		for (let attendee of attendees) {
			eventIds.push(attendee.eventId);
			userIds.push(attendee.userId);
		}

		const Op = Sequelize.Op;

		return queryInterface.bulkDelete(
			"Attendances",
			{
				eventId: {
					[Op.in]: eventIds,
				},
				userId: {
					[Op.in]: userIds,
				},
			},
			options
		);
		// options.tableName = "Attendances";
	},
};
