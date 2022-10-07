'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('Dat_Phongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ma_nguoi_dat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ma_phong: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ngay_den: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ngay_di: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      so_luong_khach: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Dat_Phongs');
  }
};
