'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authentication extends Model {
    
    static associate(models) {
    }
  }
  Authentication.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    //encryptedPassword: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Authentication',
  });
  return Authentication;
};