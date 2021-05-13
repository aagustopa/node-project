const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const db = require('./database/connect');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

db.createConnection();

app.use('/api/v1/searches', require('./routes/searchesRoutes'));
app.use('/api/v1/questions', require('./routes/questionsRoutes'));

app.listen(process.env.PORT, function() {
    console.log('Server start!', 
        `Example app listening on port ${process.env.PORT}!`);
});
