'use strict'
module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define(
		'Message',
		{
			user: DataTypes.STRING,
			channel: DataTypes.STRING,
			value: DataTypes.STRING
		},
		{}
	)
	Message.associate = function (models) {
		// associations can be defined here
	}
	return Message
}
