import { INTEGER } from 'sequelize';

const vacancyDrivingLicenseCategorySchema = {
  vacancy_id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  driving_license_category_id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
};

export default vacancyDrivingLicenseCategorySchema;
