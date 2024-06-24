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
		}
	}
	Venue.init(
		{
			groupId: {
				type: DataTypes.INTEGER,
			},
			address: {
				type: DataTypes.STRING,
			},
			city: {
				type: DataTypes.STRING,
			},
			state: {
				type: DataTypes.STRING,
			},
			lat: {
				type: DataTypes.DECIMAL,
			},
			lng: {
				type: DataTypes.DECIMAL,
			},
		},
		{
			sequelize,
			modelName: "Venue",
		}
	);
	return Venue;
};
