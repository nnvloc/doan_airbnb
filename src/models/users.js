import bcrypt from 'bcrypt';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Dat_Phongs, { foreignKey: 'ma_nguoi_dat', as: 'datPhongs' });
      this.hasMany(models.Binh_Luans, { foreignKey: 'ma_nguoi_binh_luan', as: 'binhLuans' });
    }

    isValidPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    toJSON() {
      delete this.password;
      const {password, ...results} = this.dataValues;
      return results;
    }
  };
  Users.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 'Male',
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 'user'
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
    modelName: 'Users',
  });
  return Users;
};
