const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const validator = require("validator");

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

//Express Validator
const { body, validationResult } = require('express-validator');
const { redirect } = require("express/lib/response");

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

    var msgR = req.flash("msgR");
    msgR = (msgR == undefined || msgR.length == 0) ? undefined : msgR;

    var msgError = req.flash("msgError");
    msgError = (msgError == undefined || msgError.length == 0) ? undefined : msgError;

    res.render("contato", {msgError, msgR});
});



app.post("/recebidos", 

body('email').isEmail()
.withMessage('Deve conter um e-mail.'),

(req, res) => {

    var msgError;
    var msgR; 
    
    const errors = validationResult(req);
    if (!errors.isEmpty()){

        msgError = "Deve conter um e-amail válido."
        req.flash("msgError", msgError);
        /*json apenas para teste:
        return res.status(400).json({ errors: errors.array() });*/
        res.redirect("contato");
    }else{

    var email = req.body.email;
    var mensagem = req.body.mensagem;
        
    Contato.create({
        email: req.body.email,
        mensagem: req.body.mensagem,
    }).then(() => {

        msgR = "Mensagem enviada. Obrigada pelo contato!" 
        req.flash("msgR", msgR);
        res.redirect("contato");
        })
    }
});

//Porta
app.listen(8084, () => {
    console.log("O servidor está rodando.")
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8084;
}
app.listen(port);