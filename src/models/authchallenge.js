'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthChallenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.UserKey,{
        foreignKey:"keyId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }
  AuthChallenge.init({
    userId: {
      type: DataTypes.UUID,
      allowNull:false
    },
    keyId: {
      type: DataTypes.UUID,
      allowNull:false
    },
    challenge: {
      type: DataTypes.TEXT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'AuthChallenge',
  });
  return AuthChallenge;
};