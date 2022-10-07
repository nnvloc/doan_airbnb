import bcrypt from 'bcrypt';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phongs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Vi_tris, { foreignKey: 'vi_tri', as: 'viTri' });
      this.hasMany(models.Dat_Phongs, { foreignKey: 'ma_phong', as: 'datPhongs' });
      this.hasMany(models.Binh_Luans, { foreignKey: 'ma_phong', as: 'binhLuans' });
    }
  };
  Phongs.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ten_phong: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    khach: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phong_ngu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    giuong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phong_tam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mo_ta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gia_tien: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    hinh_anh: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    may_giat: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    ban_la: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    tivi: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    dieu_hoa: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    wifi: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    bep: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    do_xe: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    ho_boi: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Phongs',
  });
  return Phongs;
};
