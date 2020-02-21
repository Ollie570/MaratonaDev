//Configurando o servidor
const express = require("express");
const server = express();

//Configurar o servidor para apresentar arquivos
//estáticos
server.use(express.static('public'));

//Habilitar corpo do formulário
server.use(express.urlencoded({extended: true}));

//Configurar conexão com banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'killasauce',
    host: 'localhost',
    port: 5432,
    database: 'DOE'
})

//Configurando a templete engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true,
});


//Lista de doadores: vetor de doadores

//Configurando a apresentação da página
server.get("/", function(req, res) {
    db.query("SELECT * FROM doadores", function(err, result) {
        if (err) return res.send("Erro no banco de dados!")

        const doadores = result.rows
        return res.render("index.html", {doadores})
    })
    
});

//Pegando dados do formulário
server.post("/", function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const sangue = req.body.sangue

    if (name == "" || email == "" || sangue == "") {
        return res.send("Todos os campos são obrigatórios!")
    }

    //Colocando valores no banco de dados
    const query = 'INSERT INTO doadores("name", "email", "sangue") VALUES ($1, $1, $3)'
    
    const values = [name, email, sangue]

    db.query(query, values, function(err) {
        //Fluxo de erro
        if (err) return res.send("Erro no banco de dados!")

        //Fluxo ideal
        return res.redirect("/")
    })

});

//O listen inicia o servidor e depois é definida 
//uma porta para ser acessado
server.listen(3000, function() {
    console.log("Servidor iniciado.")
});