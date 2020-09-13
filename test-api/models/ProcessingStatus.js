import Sequelize from 'sequelize';
import sequelize from '../database/sequelize.js';
import Statuses from './enums/Statuses.js';

const { DataTypes } = Sequelize;

const ProcessingStatus = sequelize.define('processing', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userIdentifier: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [Object.values(Statuses)],
    },
  },
});

export default ProcessingStatus;