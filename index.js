const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//View engine
app.set("view engine", "ejs");

//Body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
connection.authenticate().then(() => {
    console.log("Conexão com bd feita com sucesso.")
}).catch((error) => {
    console.log(error);
});

//Static
app.use(express.static("public"));

//Rotas
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/sobre", (req,res) => {
    res.render("sobre");
});

app.get("/projetos", (req, res) => {
    res.render("projetos");
});


//Porta
app.listen(8084, () => {
    console.log("O servidor está rodando.")
});