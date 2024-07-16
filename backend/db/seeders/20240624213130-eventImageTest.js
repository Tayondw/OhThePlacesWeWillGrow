"use strict";

const { EventImage } = require("../models");
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const images = [
	{
		eventId: 1,
		url: "https://afrotechconference.com/",
		preview: true,
	},
	{
		eventId: 2,
		url: "https://cloud.withgoogle.com/next",
		preview: true,
	},
	{
		eventId: 3,
		url: "https://io.google/2024/",
		preview: true,
	},
	{
		eventId: 4,
		url: "https://www.renderatl.com/2024-home",
		preview: true,
	},
	{
		eventId: 5,
		url: "https://www.techequitycollective.com/tec-innovate/",
		preview: true,
	},
	{
		eventId: 6,
		url: "https://bgaadvocates.careerkarma.com/",
		preview: true,
	},
	{
		eventId: 7,
		url: "https://www.amazon.com/Men-Cry-Too-Alfreada-Brown-Kelly/dp/1532745877",
		preview: true,
	},
	{
		eventId: 8,
		url: "https://www.techequitycollective.com/",
		preview: true,
	},
	{
		eventId: 9,
		url: "https://www.techequitycollective.com/",
		preview: true,
	},
	{
		eventId: 10,
		url: "https://www.techequitycollective.com/",
		preview: true,
	},
	{
		eventId: 11,
		url: "https://www.techequitycollective.com/",
		preview: true,
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
		await EventImage.bulkCreate(images, { ...options, validate: true });
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		let urls = [];
		let ids = [];

		for (let image of images) {
			urls.push(image.url);
			ids.push(image.eventId);
		}
		// options.tableName = "EventImages";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"EventImages",
			{
				eventId: {
					[Op.in]: ids,
				},
				url: {
					[Op.in]: urls,
				},
			},
			options
		);
	},
};
