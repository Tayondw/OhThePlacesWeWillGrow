"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Group extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Group.hasMany(models.GroupImage, {
				foreignKey: "groupId",
                        onDelete: "CASCADE",
			});
			Group.hasMany(models.Venue, {
				foreignKey: "groupId",
				onDelete: "CASCADE",
			});
			Group.hasMany(models.Event, {
				foreignKey: "groupId",
				onDelete: "CASCADE",
			});
			Group.hasMany(models.Membership, {
				foreignKey: "groupId",
				as: "numMembers",
			});
			Group.belongsTo(models.User, {
				foreignKey: "organizerId",
				as: "Organizer",
			});
			Group.belongsToMany(models.User, {
				through: "Memberships",
				foreignKey: "userId",
				otherKey: "groupId",
			});
		}
	}
	Group.init(
		{
			organizerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: "CASCADE",
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					properLength(value) {
						if (value.length > 60)
							throw new Error("Name must be 60 characters or less");
					},
				},
			},
			about: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					properLength(value) {
						if (value.length < 50)
							throw new Error("About must be 50 characters or more");
					},
				},
			},
			type: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					checkType(value) {
						const types = ["Online", "In person"];
						if (!types.includes(value))
							throw new Error("Type must be 'Online' or 'In person'");
					},
				},
			},
			private: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				validate: {
					isPrivate(value) {
						if (value !== true && value !== false)
							throw new Error("Private must be a boolean");
					},
				},
			},
			city: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: "City is required",
					},
					notNull: {
						args: true,
						msg: "City is required",
					},
				},
			},
			state: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: "State is required",
					},
					notNull: {
						args: true,
						msg: "City is required",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Group",
			// defaultScope: {
			// 	attributes: {
			// 		exclude: ["createdAt", "updatedAt"],
			// 	},
			// },
		}
	);
	return Group;
};
