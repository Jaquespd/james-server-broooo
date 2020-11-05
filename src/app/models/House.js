import Sequelize, { Model } from 'sequelize';

class House extends Model {
	// Casas
	static init(sequelize) {
		super.init(
			{
				title: Sequelize.STRING,
				description: Sequelize.STRING,
				street: Sequelize.STRING,
				number: Sequelize.INTEGER,
				complement: Sequelize.TEXT,
				state: Sequelize.STRING,
				city: Sequelize.STRING,
				zip_code: Sequelize.STRING,
				geolocation: Sequelize.STRING,
				price: Sequelize.STRING,
				n_guests: Sequelize.INTEGER,
				n_bedrooms: Sequelize.INTEGER,
				n_bathrooms: Sequelize.INTEGER,
				convenience: Sequelize.STRING,
			},
			{
				sequelize,
				tableName: 'houses',
				paranoid: true,
			}
		);

		return this;
	}

	static associate(models) {
		this.hasMany(models.Photo, { foreignKey: 'house_id', as: 'photos' });
		this.hasMany(models.Evaluation, {
			foreignKey: 'house_id',
			as: 'evaluations',
		});
		this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
	}
}

export default House;
