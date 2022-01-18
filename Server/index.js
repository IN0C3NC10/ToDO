const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const port = process.env.APP_PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// importação dos arquivos de rota
const TaskRoutes = require('./routes/TaskRoutes');

// define as rotas
app.use('/task',TaskRoutes);

// define a porta que esta ouvindo e printa uma simples mensagem com isto
app.listen(port, () => console.log(`API online on port ${port}!`));