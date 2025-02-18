import { DataTypes, QueryInterface } from 'sequelize';

const migration = () => ({
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      balanceInCents: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE "users" ADD CONSTRAINT "users_balance_non_negative" CHECK ("balanceInCents" >= 0);
    `);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_balance_non_negative";
    `);
    await queryInterface.dropTable('users');
  },
});

export default migration();
