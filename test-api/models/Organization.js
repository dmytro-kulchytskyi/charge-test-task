import Sequelize from 'sequelize';
import sequelize from '../database/sequelize.js';
import BusinessTypes from './enums/BusinessTypes.js';
import BankAccountTypes from './enums/BankAccountTypes.js';
import { 
  isEin,
  isZipCode,
  isPhoneNumber,
} from '../validators/index.js';

const { DataTypes } = Sequelize;

const Organization = sequelize.define('organization', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  identifier: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  dba: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ein: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEin,
    },
  },
  businessType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [Object.values(BusinessTypes)],
    },
  },
  bankAccountType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [Object.values(BankAccountTypes)],
    },
  },
  businessStreetAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  businessState: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  businessZip: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isZipCode,
    },
  },
  businessCountry: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  contactFirstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  contactLastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  contactTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
      isPhoneNumber,
    },
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  website: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUrl: true,
    },
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIPv4: true,
    },
  },
  deviceFingerprint: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  meta: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  additionalChecks: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
  },
});

export default Organization;