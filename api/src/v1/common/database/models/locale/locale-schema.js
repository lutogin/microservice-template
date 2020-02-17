import { STRING } from 'sequelize';

const localeSchema = {
  locale: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
};

export default localeSchema;
