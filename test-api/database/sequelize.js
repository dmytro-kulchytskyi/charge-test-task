import Sequelize from 'sequelize';
import config from '../config.js';

const { name, user, password, dialect, host } = config.database;
const sequelize = new Sequelize(name, user, password, {
  dialect,
  host,
});

export default sequelize;
