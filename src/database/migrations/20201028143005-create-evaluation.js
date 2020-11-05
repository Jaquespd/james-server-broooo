const Sequelize = require('sequelize');

module.exports = {
	up: queryInterface => {
		return queryInterface.createTable('evaluations', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cleaning: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			communication: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			check_in: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			precision: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			location: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			value: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			user_id: {
				// Referência a quem aluga
				type: Sequelize.INTEGER,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: false,
			},
			house_id: {
				// Referência a casa
				type: Sequelize.INTEGER,
				references: { model: 'houses', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable('evaluations');
	},
};
