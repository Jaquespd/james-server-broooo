module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('appointments', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			date: {
				allowNull: true,
				type: Sequelize.DATE,
			},
			start_date: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			end_date: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			owner_id: {
				type: Sequelize.INTEGER,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: true,
			},
			client_id: {
				type: Sequelize.INTEGER,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: true,
			},
			house_id: {
				type: Sequelize.INTEGER,
				references: { model: 'appointments', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: true,
			},
			canceled_at: {
				type: Sequelize.DATE,
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
		return queryInterface.dropTable('appointments');
	},
};
