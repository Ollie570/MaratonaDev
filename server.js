//Configurando o servidor
const express = require("express");
const server = express();

//Configurar o servidor para apresentar arquivos
//estáticos
server.use(express.static('public'));

//Configurando a templete engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server
});

//Configurando a apresentação da página
server.get("/", function(req, res) {
    return res.render("index.html")
});

//O listen inicia o servidor e depois é definida 
//uma porta para ser acessado
server.listen(3000, function() {
    console.log("Servidor iniciado.")
});