"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Membership extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Membership.belongsTo(models.User, {
				foreignKey: "userId",
				onDelete: "CASCADE",
			});
			Membership.belongsTo(models.Group, {
				foreignKey: "groupId",
				onDelete: "CASCADE",
			});
		}
	}
	Membership.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			groupId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM,
				allowNull: false,
				validate: {
					permissions(value) {
						const permission = ["pending", "member", "organizer", "co-host"];

						if (!permission.includes(value)) {
							throw new Error("Invalid member");
						}
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Membership",
			defaultScope: {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
		}
	);
	return Membership;
};
