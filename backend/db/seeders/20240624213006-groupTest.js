"use strict";

const { Group } = require("../models");
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const groups = [
	{
		organizerId: 1,
		name: "Group 1",
		about:
			"This is to test the FIRST test group.        11111111111111111111111111111111111111111111",
		type: "Online",
		private: true,
		city: "Atlanta",
		state: "GA",
	},
	{
		organizerId: 2,
		name: "Group 2",
		about:
			"This is to test the SECOND test group.        22222222222222222222222222222222222222222222",
		type: "In person",
		private: false,
		city: "San Francisco",
		state: "CA",
	},
	{
		organizerId: 3,
		name: "Group 3",
		about:
			"This is to test the THIRD test group.        33333333333333333333333333333333333333333333",
		type: "Online",
		private: true,
		city: "Seattle",
		state: "WA",
	},
	{
		organizerId: 4,
		name: "Group 4",
		about:
			"This is to test the FOURTH test group.        444444444444444444444444444444444444444444444",
		type: "In person",
		private: false,
		city: "Philadelphia",
		state: "PA",
	},
	{
		organizerId: 4,
		name: "Group 5",
		about:
			"This is to test the FIFTH test group.        555555555555555555555555555555555555555555555",
		type: "Online",
		private: true,
		city: "Alexandria",
		state: "VA",
	},
	{
		organizerId: 3,
		name: "Group 6",
		about:
			"This is to test the SIXTH test group.        666666666666666666666666666666666666666666666",
		type: "In person",
		private: true,
		city: "Baton Rouge",
		state: "LA",
	},
	{
		organizerId: 2,
		name: "Group 7",
		about:
			"This is to test the SEVENTH test group.        777777777777777777777777777777777777777777777",
		type: "In person",
		private: false,
		city: "Boston",
		state: "MA",
	},
	{
		organizerId: 1,
		name: "Group 8",
		about:
			"This is to test the EIGHTH test group.        88888888888888888888888888888888888888888888",
		type: "Online",
		private: false,
		city: "Des Moines",
		state: "IA",
	},
	{
		organizerId: 1,
		name: "Group 9",
		about:
			"This is to test the NINTH test group.        999999999999999999999999999999999999999999999",
		type: "Online",
		private: false,
		city: "Des Moines",
		state: "IA",
	},
	{
		organizerId: 12,
		name: "Group 10",
		about:
			"This is to test the TENTH test group.        1010101010101010101010101010101010101010101010",
		type: "Online",
		private: false,
		city: "Des Moines",
		state: "IA",
	},
	{
		organizerId: 13,
		name: "Group 11",
		about:
			"This is to test the ELEVENTH test group.        011011011011011011011011011011011011011011011011",
		type: "Online",
		private: false,
		city: "Des Moines",
		state: "IA",
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
		await Group.bulkCreate(groups, { ...options, validate: true });
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		let organizerIds = [];
		let names = [];

		for (let group of groups) {
			organizerIds.push(group.organizerId);
			names.push(group.name);
		}

		// options.tableName = "Groups";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"Groups",
			{
				organizerId: {
					[Op.in]: organizerIds,
				},
				name: {
					[Op.in]: names,
				},
			},
			options
		);
	},
};
