import associateModels from '../models/associateModels.js';

export default async function (sequelize) {
  associateModels();

  console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
};
