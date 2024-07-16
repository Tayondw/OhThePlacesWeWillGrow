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
		name: "App Academy",
		about:
			"This is to for those who are enrolled in App Academy, the FIRST test group.",
		type: "Online",
		private: true,
		city: "Atlanta",
		state: "GA",
	},
	{
		organizerId: 2,
		name: "Google Lovers",
		about:
			"This is to for those who love Google and Google Products, the SECOND test group.",
		type: "In person",
		private: false,
		city: "San Francisco",
		state: "CA",
	},
	{
		organizerId: 3,
		name: "Google",
		about:
			"This is to for those who love Google and everything there is to Google, the THIRD test group.",
		type: "Online",
		private: true,
		city: "Seattle",
		state: "WA",
	},
	{
		organizerId: 4,
		name: "Render",
		about:
			"This is to for those who love Render and everything there is to Render, the FOURTH test group.",
		type: "In person",
		private: false,
		city: "Philadelphia",
		state: "PA",
	},
	{
		organizerId: 4,
		name: "Tech Equity Collective",
		about:
			"This is to for those who love Tech Equity Collective and everything there is to Tech Equity Collective, the FIFTH test group.",
		type: "Online",
		private: true,
		city: "Alexandria",
		state: "VA",
	},
	{
		organizerId: 3,
		name: "Black Genius Academy",
		about:
			"This is to for those who love Black Genius Academy and everything there is to Google, the SIXTH test group.",
		type: "In person",
		private: true,
		city: "Baton Rouge",
		state: "LA",
	},
	{
		organizerId: 2,
		name: "Men Cry Too",
		about:
			"This is to for those who love Men Cry Too and everything there is to Men Cry Too, the SEVENTH test group.",
		type: "In person",
		private: false,
		city: "Boston",
		state: "MA",
	},
	{
		organizerId: 1,
		name: "Tech Talk",
		about:
			"This is to for those who love talking about tech and everything there is to know about tech, the EIGHT test group.",
		type: "Online",
		private: false,
		city: "Des Moines",
		state: "IA",
	},
	{
		organizerId: 1,
		name: "SWE Talk",
		about:
			"This is to for those who love talking about tech and everything there is to know about software engineering, the NINTH test group.",
		type: "Online",
		private: false,
		city: "Des Moines",
		state: "IA",
	},
	{
		organizerId: 12,
		name: "The Affluent Standard",
		about:
			"This is to for those who love talking about tHE Affluent Standard and everything there is to know about the Affluent Standard, the TENTH test group.",
		type: "Online",
		private: false,
		city: "Des Moines",
		state: "IA",
	},
	{
		organizerId: 13,
		name: "SWE Study",
		about:
			"This is to for those who love talking about and studying tech and everything there is to know about software engineering, the ELEVENTH test group.",
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
