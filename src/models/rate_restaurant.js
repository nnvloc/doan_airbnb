'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RateRestaurants extends Model {
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
  RateRestaurants.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    res_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_rate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    }
  }, {
    sequelize,
    modelName: 'rate_res',
    createdAt: false,
    updatedAt: false,
  });
  return RateRestaurants;
};
