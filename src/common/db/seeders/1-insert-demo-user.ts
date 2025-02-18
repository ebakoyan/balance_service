import { QueryInterface } from 'sequelize';

const seed = () => ({
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
        INSERT INTO users (id, "balanceInCents") VALUES (default, '100000')
    `);
  },
});

export default seed();
