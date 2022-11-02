'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const proses = require('process');
const basename = path.basename(__filename);
const env = proses.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const database = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(proses.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    database[model.name] = model;
  });

Object.keys(database).forEach(modelName => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

database.sequelize = sequelize;
module.exports = database;
