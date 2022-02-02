const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");


const Contato = require("./Contato");

//Cookie Parser
app.use(cookieParser("itz"));

//Express Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

//Flash
app.use(flash());

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

app.get("/contato", (req, res) => {

    res.render("contato");
});

app.post("/admin/recebidos", (req, res) => {
   
      var email = req.body.email;
      var mensagem = req.body.mensagem;
        
    Contato.create({
        email: email,
        mensagem: mensagem
    }).then(() => {
        res.redirect("/")
    })  
});


//Porta
app.listen(8084, () => {
    console.log("O servidor está rodando.")
});