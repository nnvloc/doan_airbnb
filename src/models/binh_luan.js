import bcrypt from 'bcrypt';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BinhLuans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Phongs, { foreignKey: 'ma_phong', as: 'phongs' });
      this.belongsTo(models.Users, { foreignKey: 'ma_nguoi_binh_luan', as: 'nguoi_binh_luan' });
    }
  };
  BinhLuans.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ma_nguoi_binh_luan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ma_phong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    noi_dung: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sao_binh_luan: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Binh_Luans',
  });
  return BinhLuans;
};
