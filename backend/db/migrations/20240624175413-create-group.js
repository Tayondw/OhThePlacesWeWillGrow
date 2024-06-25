"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Groups",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				organizerId: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				name: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				about: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				type: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				private: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
				},
				city: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				state: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		// options.tableName = "Groups";
		await queryInterface.dropTable("Groups", options);
	},
};
