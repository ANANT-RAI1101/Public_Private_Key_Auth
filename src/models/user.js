'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.UserKey,{
        foreignKey:"userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    }
  }
  user.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};