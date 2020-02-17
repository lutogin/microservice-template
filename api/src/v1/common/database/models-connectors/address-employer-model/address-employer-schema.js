import { INTEGER } from 'sequelize';

const addressEmployerSchema = {
  address_id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  employer_id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
};

export default addressEmployerSchema;
