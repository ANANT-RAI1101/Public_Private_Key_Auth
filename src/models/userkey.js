'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserKey.init({
    userId: {
      type: DataTypes.UUID,
      allowNull:false
    },
    deviceName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    publicKey: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    algorithm: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'UserKey',
  });
  return UserKey;
};