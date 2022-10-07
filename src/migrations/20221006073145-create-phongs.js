'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('Phongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_phong: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vi_tri: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      khach: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phong_ngu: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      giuong: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phong_tam: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mo_ta: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gia_tien: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      hinh_anh: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      may_giat: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      ban_la: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      tivi: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      dieu_hoa: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      wifi: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      bep: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      do_xe: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      ho_boi: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
     await queryInterface.dropTable('Phongs');
  }
};
