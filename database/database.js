const Sequelize = require("sequelize");
const connection = new Sequelize("contato", "root", "Passei1t", {
    host:'localhost',
    dialect: 'mysql'
});

module.exports = connection;