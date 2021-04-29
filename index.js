const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connect = require('./database/connection');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect.createConnection();

// app.use('/api/v1/users', require('./routes/userRoutes'));
// app.use('/api/v1/auth', require('./routes/authRoutes'));


app.listen(process.env.PORT, function() {
    console.log(`Example app listening on port ${process.env.PORT}`)
})