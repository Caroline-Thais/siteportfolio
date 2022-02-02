const Sequelize = require("sequelize");
const connection = require("./database/database");

const Contato = connection.define('contatos', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    mensagem:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});


module.exports = Contato;