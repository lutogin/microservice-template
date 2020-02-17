module.exports = Sequelize => ({
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
  password_hash: {
    type: Sequelize.STRING,
  },
});
