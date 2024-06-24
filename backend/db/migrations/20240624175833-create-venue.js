"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Venues", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			groupId: {
				type: Sequelize.INTEGER,
			},
			address: {
				type: Sequelize.STRING,
			},
			city: {
				type: Sequelize.STRING,
			},
			state: {
				type: Sequelize.STRING,
			},
			lat: {
				type: Sequelize.DECIMAL,
			},
			lng: {
				type: Sequelize.DECIMAL,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "Venues";
		await queryInterface.dropTable("Venues");
	},
};
