module.exports = Sequelize => ({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
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
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
