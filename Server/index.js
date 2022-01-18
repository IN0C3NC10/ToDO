const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models/');

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`API online on port ${port}!`));

app.get('/', (req, res) => res.send('Hello World!'));
