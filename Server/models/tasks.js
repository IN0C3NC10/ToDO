'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tasks.init({
    macaddress: {
      type:DataTypes.STRING,
      allowNull:false
    },
    category: DataTypes.NUMERIC,
    title: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.TEXT,
      allowNull:false},
    when: {
      type:DataTypes.DATE,
      allowNull:false
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};