import { INTEGER, STRING, DATE, NOW } from 'sequelize';
import PERMISSIONS from '../../common/constants/permissions';

const userSchema = {
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    autoIncrement: true,
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: {
      args: true,
      msg: 'Email address already in use!',
    },
  },
  first_name: {
    type: STRING,
  },
  last_name: {
    type: STRING,
  },
  phone_number: {
    type: STRING,
  },
  gender: {
    type: STRING,
  },
  age: {
    type: INTEGER,
  },
  role: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: PERMISSIONS.USER,
  },
  account_status: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: 1, // Need to understand all statuses of account
  },
  created_at: {
    type: DATE,
    defaultValue: NOW,
    allowNull: false,
  },
  updated_at: {
    type: DATE,
    defaultValue: NOW,
    allowNull: false,
  },
};

export default userSchema;
