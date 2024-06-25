"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Event extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Event.hasMany(models.EventImage, {
				foreignKey: "eventId",
				onDelete: "CASCADE",
			});
			Event.belongsTo(models.Group, {
				foreignKey: "groupId",
			});
			Event.belongsTo(models.Venue, {
				foreignKey: "venueId",
			});
			Event.belongsToMany(models.User, {
				through: models.Attendance,
				foreignKey: "userId",
				otherKey: "eventId",
			});
		}
	}
	Event.init(
		{
			venueId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				onDelete: "CASCADE",
				validate: {
					type(value) {
						if (this.type === "In person" && !value)
							throw new Error(
								"Not a valid value. Need venue for in person event"
							);
					},
				},
			},
			groupId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: "CASCADE",
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					properLength(value) {
						if (value.length < 5)
							throw new Error("Name must be at least 5 characters");
					},
				},
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Description is required",
					},
				},
			},
			type: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					whichType(value) {
						const types = ["Online", "In person"];
						if (!types.includes(value))
							throw new Error("Type must be Online or In person");
					},
				},
			},
			capacity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: {
						args: true,
						msg: "Capacity must be an integer",
					},
				},
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isDecimal: true,
					priceValidation(value) {
						if (value < 0.0) throw new Error("Price is invalid");
					},
				},
			},
			startDate: {
				type: DataTypes.DATE,
				allowNull: false,
				// validate: {
				// 	isDate: true,
				// 	isBefore(value) {
				// 		if (value > this.endDate)
				// 			throw new Error("Start date must be in the future");
				// 	},
				// },
			},
			endDate: {
				type: DataTypes.DATE,
				allowNull: false,
				// validate: {
				// 	isDate: true,
				// 	isAfter(value) {
				// 		if (value < this.startDate)
				// 			throw new Error("End date is less than start date");
				// 	},
				// },
			},
		},
		{
			sequelize,
			modelName: "Event",
			defaultScope: {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
		}
	);
	return Event;
};
