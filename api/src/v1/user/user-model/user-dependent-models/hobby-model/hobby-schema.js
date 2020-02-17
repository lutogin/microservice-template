import { INTEGER, STRING } from 'sequelize';

const hobbySchema = {
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    autoIncrement: true,
  },
  user_id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
  },
  title: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
};

export default hobbySchema;
