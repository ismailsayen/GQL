const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('verceldb', 'default', 'vWhsa3ePR8wn', {
    host: 'ep-young-union-72839465-pooler.us-east-1.postgres.vercel-storage.com',
    dialect: 'postgres',
    port: 5432,
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Vous pouvez également définir cette option sur true si nécessaire
        }
    }
});


module.exports = sequelize;
