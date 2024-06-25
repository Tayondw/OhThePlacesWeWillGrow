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
			EventImage.belongsTo(models.Event, {
				foreignKey: "eventId",
			});
		}
	}
	EventImage.init(
		{
			eventId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			url: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					isUrl: {
						args: true,
						msg: "Must be a valid url",
					},
				},
			},
			preview: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "EventImage",
			defaultScope: {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
		}
	);
	return EventImage;
};
