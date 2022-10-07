import bcrypt from 'bcrypt';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DatPhongs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Phongs, { foreignKey: 'ma_phong', as: 'phongs' });
      this.belongsTo(models.Users, { foreignKey: 'ma_nguoi_dat', as: 'nguoi_dat' });
    }
  };
  DatPhongs.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ma_nguoi_dat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ma_phong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ngay_den: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ngay_di: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    so_luong_khach: {
      type: DataTypes.INTEGER,
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
    modelName: 'Dat_Phongs',
  });
  return DatPhongs;
};
