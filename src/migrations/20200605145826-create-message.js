'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Messages', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user: {
				allowNull: false,
				type: Sequelize.STRING
			},
			channel: {
				allowNull: false,
				type: Sequelize.STRING
			},
			value: {
				allowNull: false,
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Messages')
	}
}
