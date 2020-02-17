import { INTEGER, STRING } from 'sequelize';

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
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  short_description: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  photo: {
    type: STRING,
  },
};

export default userSchema;
