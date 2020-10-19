const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { notFound } = require('./handlers/errorHandler');
const { connectWithDb } = require('./helpers/dbHelper');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => res.send('Hello World'));

app.use('/api', routes);

app.use(notFound);

const port = process.env.PORT || 7777;

connectWithDb();

app.listen(port, () => console.log(`Server is listening on port ${port}`));
