"use strict";

const { Model, Validator} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.belongsToMany(models.Group, {
				through: models.Membership,
				foreignKey: "userId",
				otherKey: "groupId",
			});
			User.belongsToMany(models.Event, {
				through: models.Attendance,
				foreignKey: "userId",
				otherKey: "eventId",
			});
			User.hasMany(models.Group, {
				foreignKey: "organizerId",
			});
		}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [3, 30],
						msg: "First name must be between 3 and 30 characters",
					},
					notEmpty: {
						args: true,
						msg: "First Name is required",
					},
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [3, 30],
						msg: "Last name must be between 3 and 30 characters",
					},
					notEmpty: {
						args: true,
						msg: "Last Name is required",
					},
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [4, 30],
					notEmpty: {
						args: true,
						msg: "Username is required",
					},
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error("Cannot be an email.");
						}
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [3, 256],
					isEmail: {
						args: true,
						msg: "Invalid email",
					},
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			defaultScope: {
				attributes: {
					exclude: ["email", "hashedPassword", "createdAt", "updatedAt"],
				},
			},
		}
	);
	return User;
};
