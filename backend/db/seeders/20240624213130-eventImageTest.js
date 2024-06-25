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
		url: "https://www.pexels.com/photo/silhouette-of-man-standing-against-black-and-red-background-333850/",
		preview: true,
	},
	{
		eventId: 2,
		url: "https://www.pexels.com/photo/blue-and-red-abstract-painting-1068872/",
		preview: true,
	},
	{
		eventId: 3,
		url: "https://www.pexels.com/photo/i-love-you-light-streaks-776764/",
		preview: true,
	},
	{
		eventId: 4,
		url: "https://www.pexels.com/photo/clear-glass-footed-drinking-glass-with-orange-juice-338713/",
		preview: true,
	},
	{
		eventId: 5,
		url: "https://www.pexels.com/photo/yellow-volkswagen-beetle-die-cast-on-floor-381228/",
		preview: true,
	},
	{
		eventId: 6,
		url: "https://www.pexels.com/photo/pineapple-with-brown-sunglasses-459601/",
		preview: true,
	},
	{
		eventId: 7,
		url: "https://www.pexels.com/photo/blue-body-of-water-261152/",
		preview: true,
	},
	{
		eventId: 8,
		url: "https://www.pexels.com/photo/lime-cocktail-drink-with-two-straws-1187766/",
		preview: true,
	},
	{
		eventId: 9,
		url: "https://www.pexels.com/photo/white-rabbit-wearing-yellow-eyeglasses-4588065/",
		preview: true,
	},
	{
		eventId: 10,
		url: "https://www.pexels.com/photo/photo-of-woman-sitting-on-chair-993870/",
		preview: true,
	},
	{
		eventId: 11,
		url: "https://www.pexels.com/photo/close-up-photography-of-water-flow-612341/",
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
