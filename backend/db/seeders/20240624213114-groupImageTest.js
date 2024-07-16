"use strict";

const { GroupImage } = require("../models");
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const images = [
	{
		groupId: 1,
		url: "https://afrotechconference.com/",
		preview: true,
	},
	{
		groupId: 2,
		url: "https://cloud.withgoogle.com/next",
		preview: true,
	},
	{
		groupId: 3,
		url: "https://io.google/2024/",
		preview: true,
	},
	{
		groupId: 4,
		url: "https://www.renderatl.com/2024-home",
		preview: true,
	},
	{
		groupId: 5,
		url: "https://www.techequitycollective.com/",
		preview: true,
	},
	{
		groupId: 6,
		url: "https://bgaadvocates.careerkarma.com/",
		preview: true,
	},
	{
		groupId: 7,
		url: "https://www.amazon.com/Men-Cry-Too-Alfreada-Brown-Kelly/dp/1532745877",
		preview: true,
	},
	{
		groupId: 8,
		url: "https://www.techequitycollective.com/",
		preview: true,
	},
	{
		groupId: 9,
		url: "https://www.techequitycollective.com/",
		preview: true,
	},
	{
		groupId: 10,
		url: "https://www.techequitycollective.com/",
		preview: true,
	},
	{
		groupId: 11,
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
		await GroupImage.bulkCreate(images, { ...options, validate: true });
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
			ids.push(image.groupId);
		}

		// options.tableName = "GroupImages";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"GroupImages",
			{
				groupId: {
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
