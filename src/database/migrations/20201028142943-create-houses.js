const Sequelize = require('sequelize');

module.exports = {
	up: queryInterface => {
		return queryInterface.createTable('houses', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			street: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			number: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			complement: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			state: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			city: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			zip_code: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			geolocation: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			price: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			n_guests: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			n_bedrooms: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			n_bathrooms: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			convenience: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			owner_id: {
				type: Sequelize.INTEGER,
				references: { model: 'users', key: 'id' },
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
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable('houses');
	},
};
