"use strict";

const { Venue } = require("../models");
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
		await Venue.bulkCreate(
			[
				{
					groupId: 1,
					address: "206 Washington Street",
					city: "Atlanta",
					state: "GA",
					lat: 33.7490,
					lng: -84.3881,
				},
				{
					groupId: 2,
					address: "1315 10th Street",
					city: "San Francisco",
					state: "CA",
					lat: 38.5766,
					lng: -121.4936,
				},
				{
					groupId: 3,
					address: "416 Sid Snyder Ave SW",
					city: "Seattle",
					state: "WA",
					lat: 47.0357,
					lng: -122.9048,
				},
				{
					groupId: 4,
					address: "501 N 3rd Street",
					city: "Philadelphia",
					state: "PA",
					lat: 40.2643,
					lng: -76.884,
				},
				{
					groupId: 5,
					address: "206 Washington Street",
					city: "Alexandria",
					state: "VA",
					lat: 37.9268,
					lng: -78.0249,
				},
				{
					groupId: 6,
					address: "900 North 3rd Street",
					city: "Baton Rouge",
					state: "LA",
					lat: 30.2725,
					lng: -91.1114,
				},
				{
					groupId: 7,
					address: "24 Beacon Street",
					city: "Boston",
					state: "MA",
					lat: 42.3588,
					lng: -71.0638,
				},
				{
					groupId: 8,
					address: "1007 E Grand Avenue",
					city: "Des Moines",
					state: "IA",
					lat: 41.5911,
					lng: -93.6038,
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
		options.tableName = "Venues";
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
