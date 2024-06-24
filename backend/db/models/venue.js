"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Venue extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Venue.belongsTo(models.Group, {
				foreignKey: "groupId",
			});
			Venue.hasMany(models.Event, {
				foreignKey: "venueId",
				onDelete: "CASCADE",
			});
		}
	}
	Venue.init(
		{
			groupId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Street address is required",
					},
					notEmpty: {
						args: true,
						msg: "Street address is required",
					},
				},
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "City is required",
					},
					notEmpty: {
						args: true,
						msg: "City is required",
					},
				},
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "State is required",
					},
					notEmpty: {
						args: true,
						msg: "State is required",
					},
				},
			},
			lat: {
				type: DataTypes.FLOAT,
				allowNull: false,
				validate: {
					checkLatitude(value) {
						if (value < -90 || value > 90)
							throw new Error("Latitude must be within -90 and 90");
					},
				},
			},
			lng: {
				type: DataTypes.FLOAT,
				allowNull: false,
				validate: {
					checkLongitude(value) {
						if (value < -180 || value > 180)
							throw new Error("Longitude must be within -180 and 180");
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Venue",
			defaultScope: {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
		}
	);
	return Venue;
};
