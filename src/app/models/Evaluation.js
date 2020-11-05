import Sequelize, { Model } from 'sequelize';

class Evaluation extends Model {
	static init(sequelize) {
		super.init(
			{
				description: Sequelize.STRING,
				cleaning: Sequelize.INTEGER,
				communication: Sequelize.INTEGER,
				check_in: Sequelize.INTEGER,
				precision: Sequelize.INTEGER,
				location: Sequelize.INTEGER,
				value: Sequelize.INTEGER,
			},
			{
				sequelize,
			}
		);

		return this;
	}

	static associate(models) {
		this.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'user',
		});
		this.belongsTo(models.House, {
			foreignKey: 'house_id',
			as: 'house',
		});
	}
}

export default Evaluation;
