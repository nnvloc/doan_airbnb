'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikeRestaurants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
      this.belongsTo(models.Restaurants, { foreignKey: 'res_id', as: 'restaurant' });
    }
  };
  LikeRestaurants.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    res_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_like: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    }
  }, {
    sequelize,
    modelName: 'like_res',
    createdAt: false,
    updatedAt: false,
  });
  return LikeRestaurants;
};
