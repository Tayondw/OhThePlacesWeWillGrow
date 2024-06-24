"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class EventImage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	EventImage.init(
		{
			eventId: {
				type: DataTypes.INTEGER,
			},
			url: {
				type: DataTypes.STRING,
			},
			preview: {
				type: DataTypes.BOOLEAN,
			},
		},
		{
			sequelize,
			modelName: "EventImage",
		}
	);
	return EventImage;
};
