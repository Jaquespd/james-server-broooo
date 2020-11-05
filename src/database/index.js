import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

// Importar models e colocar no array
import User from '../app/models/User';
import File from '../app/models/File';
import Evaluation from '../app/models/Evaluation';
import House from '../app/models/House';
import Photo from '../app/models/Photo';
import Appointment from '../app/models/Appointment';

const models = [User, File, Evaluation, House, Photo, Appointment];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);

		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models));

		this.connection
			.authenticate()
			.then(() => {
				console.log('Connection has been established successfully.');
			})
			.catch(err => {
				console.error('Unable to connect to the database:', err);
			});
	}
}

export default new Database();
