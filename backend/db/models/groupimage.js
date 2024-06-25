"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class GroupImage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			GroupImage.belongsTo(models.Group, {
				foreignKey: "groupId",
			});
		}
	}
	GroupImage.init(
		{
			groupId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			url: {
				type: DataTypes.STRING,
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
			modelName: "GroupImage",
			defaultScope: {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
		}
	);
	return GroupImage;
};
