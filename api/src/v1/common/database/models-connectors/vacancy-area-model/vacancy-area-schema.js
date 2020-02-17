import { INTEGER } from 'sequelize';

const vacancyAreaSchema = {
  vacancy_id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  area_id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
};

export default vacancyAreaSchema;
