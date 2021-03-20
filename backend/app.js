const mysql = require('mysql');
const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const db = require('./connection');

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);

app.use('/api/post', postRoutes);

app.use('/api/comment', commentRoutes);

module.exports = app;
