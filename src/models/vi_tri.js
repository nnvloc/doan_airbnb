import bcrypt from 'bcrypt';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ViTris extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Phongs, { foreignKey: 'vi_tri', as: 'phongs' });
    }
  };
  ViTris.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ten: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tinh: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quoc_gia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hinh_anh: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Vi_tris',
  });
  return ViTris;
};
