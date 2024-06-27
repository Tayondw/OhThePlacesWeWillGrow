"use strict";

const { Event } = require("../models");
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const events = [
	{
		venueId: null,
		groupId: 1,
		name: "Event1",
		description: "This is Event 1.",
		type: "Online",
		capacity: 10,
		price: 5.99,
		startDate: "2025-01-01T05:00:00.000Z",
		endDate: "2025-01-01T06:00:00.000Z",
	},
	{
		venueId: null,
		groupId: 2,
		name: "Event2",
		description: "This is Event 2.",
		type: "Online",
		capacity: 15,
		price: 6.99,
		startDate: "2025-02-01T05:00:00.000Z",
		endDate: "2025-02-01T06:00:00.000Z",
	},
	{
		venueId: null,
		groupId: 3,
		name: "Event3",
		description: "This is Event 3.",
		type: "Online",
		capacity: 20,
		price: 7.99,
		startDate: "2025-03-01T05:00:00.000Z",
		endDate: "2025-03-01T06:00:00.000Z",
	},
	{
		venueId: 4,
		groupId: 4,
		name: "Event4",
		description: "This is Event 4.",
		type: "In person",
		capacity: 25,
		price: 8.99,
		startDate: "2025-04-01T05:00:00.000Z",
		endDate: "2025-04-01T06:00:00.000Z",
	},
	{
		venueId: 5,
		groupId: 5,
		name: "Event5",
		description: "This is Event 5.",
		type: "In person",
		capacity: 20,
		price: 9.99,
		startDate: "2025-05-01T05:00:00.000Z",
		endDate: "2025-05-01T06:00:00.000Z",
	},
	{
		venueId: 6,
		groupId: 6,
		name: "Event6",
		description: "This is Event 6.",
		type: "In person",
		capacity: 15,
		price: 20.99,
		startDate: "2025-06-01T05:00:00.000Z",
		endDate: "2025-06-01T06:00:00.000Z",
	},
	{
		venueId: 7,
		groupId: 7,
		name: "Event7",
		description: "This is Event 7.",
		type: "In person",
		capacity: 10,
		price: 120.99,
		startDate: "2025-07-01T05:00:00.000Z",
		endDate: "2025-07-01T06:00:00.000Z",
	},
	{
		venueId: 8,
		groupId: 8,
		name: "Event8",
		description: "This is Event 8.",
		type: "In person",
		capacity: 5,
		price: 50.99,
		startDate: "2025-08-01T05:00:00.000Z",
		endDate: "2025-08-01T06:00:00.000Z",
	},
	{
		venueId: 9,
		groupId: 9,
		name: "Event9",
		description: "This is Event 9.",
		type: "In person",
		capacity: 100,
		price: 250.99,
		startDate: "2025-09-01T05:00:00.000Z",
		endDate: "2025-09-01T06:00:00.000Z",
	},
	{
		venueId: 10,
		groupId: 10,
		name: "Event10",
		description: "This is Event 10.",
		type: "In person",
		capacity: 1000,
		price: 5000.99,
		startDate: "2025-10-01T05:00:00.000Z",
		endDate: "2025-10-01T06:00:00.000Z",
	},
	{
		venueId: 11,
		groupId: 11,
		name: "Event11",
		description: "This is Event 11.",
		type: "In person",
		capacity: 500,
		price: 99.99,
		startDate: "2025-11-01T05:00:00.000Z",
		endDate: "2025-11-01T06:00:00.000Z",
      },
      {
		venueId: 11,
		groupId: 2,
		name: "Event12",
		description: "This is Event 12.",
		type: "In person",
		capacity: 500,
		price: 99.99,
		startDate: "2025-11-01T05:00:00.000Z",
		endDate: "2025-11-01T06:00:00.000Z",
      },
      {
		venueId: 9,
		groupId: 2,
		name: "Event13",
		description: "This is Event 13.",
		type: "In person",
		capacity: 500,
		price: 99.99,
		startDate: "2025-11-01T05:00:00.000Z",
		endDate: "2025-11-01T06:00:00.000Z",
	},{
		venueId: 8,
		groupId: 2,
		name: "Event14",
		description: "This is Event 14.",
		type: "In person",
		capacity: 500,
		price: 99.99,
		startDate: "2025-11-01T05:00:00.000Z",
		endDate: "2025-11-01T06:00:00.000Z",
	},{
		venueId: 11,
		groupId: 2,
		name: "Event15",
		description: "This is Event 15.",
		type: "In person",
		capacity: 500,
		price: 99.99,
		startDate: "2025-11-01T05:00:00.000Z",
		endDate: "2025-11-01T06:00:00.000Z",
	},{
		venueId: 7,
		groupId: 2,
		name: "Event16",
		description: "This is Event 16.",
		type: "In person",
		capacity: 500,
		price: 99.99,
		startDate: "2025-11-01T05:00:00.000Z",
		endDate: "2025-11-01T06:00:00.000Z",
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
		await Event.bulkCreate(events, { ...options, validate: true });
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		let names = [];
		let groupIds = [];
		let startDates = [];
		let endDates = [];

		for (let event of events) {
			names.push(event.name);
			groupIds.push(event.groupId);
			startDates.push(event.startDate);
			endDates.push(event.endDate);
		}
		// options.tableName = "Events";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"Events",
			{
				name: {
					[Op.in]: names,
				},
				groupId: {
					[Op.in]: groupIds,
				},
				startDate: {
					[Op.in]: startDates,
				},
				endDate: {
					[Op.in]: endDates,
				},
			},
			options
		);
	},
};
