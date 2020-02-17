import { INTEGER, STRING } from 'sequelize';

const authSchema = {
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
  password_hash: {
    type: STRING,
  },
};

export default authSchema;
