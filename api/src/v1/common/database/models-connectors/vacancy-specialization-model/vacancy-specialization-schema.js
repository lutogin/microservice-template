import { INTEGER } from 'sequelize';

const vacancySpecializationSchema = {
  vacancy_id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  specialization_id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
};

export default vacancySpecializationSchema;
