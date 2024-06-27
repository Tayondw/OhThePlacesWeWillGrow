"use strict";

const { Membership } = require("../models");
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const members = [
	{
		userId: 1,
		groupId: 1,
		status: "co-host",
	},
	{
		userId: 5,
		groupId: 2,
		status: "co-host",
	},
	{
		userId: 10,
		groupId: 5,
		status: "member",
	},
	{
		userId: 2,
		groupId: 3,
		status: "pending",
	},
	{
		userId: 3,
		groupId: 4,
		status: "member",
	},
	{
		userId: 4,
		groupId: 6,
		status: "member",
	},
	{
		userId: 7,
		groupId: 2,
		status: "member",
	},
	{
		userId: 8,
		groupId: 7,
		status: "pending",
	},
	{
		userId: 6,
		groupId: 4,
		status: "co-host",
	},
	{
		userId: 9,
		groupId: 2,
		status: "co-host",
      },
      {
		userId: 15,
		groupId: 2,
		status: "co-host",
	},{
		userId: 14,
		groupId: 2,
		status: "pending",
	},{
		userId: 12,
		groupId: 2,
		status: "member",
	},{
		userId: 11,
		groupId: 2,
		status: "member",
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
		await Membership.bulkCreate(members, { ...options, validate: true });
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		// options.tableName = "Memberships";
		let userIds = [];
		let groupIds = [];

            const Op = Sequelize.Op;
            
		for (let member of members) {
			userIds.push(member.userId);
			groupIds.push(member.groupId);
            }
            
		return queryInterface.bulkDelete(
			"Memberships",
			{
				userId: {
					[Op.in]: userIds,
				},
				groupId: {
					[Op.in]: groupIds,
				},
			},
			options
		);
	},
};
