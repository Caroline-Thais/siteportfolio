const Sequelize = require("sequelize");
const connection = require("./database/database");

const Contato = connection.define('contatos', {
    assunto:{
        type: Sequelize.STRING,
        allowNull: true
    },
    mensagem:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});


module.exports = Contato;