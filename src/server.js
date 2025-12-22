//Criar a API escutar e reportar e gerenciar todo o app
//nodemon atualiza o sistema toda vez que vc adiciona um novo arquivo
//parei no minuto 09:21

const express = require('express');

const app = express();

const PORT = 5001;
const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)});