const express = require('express');
const router = require('./routes');
const {syncAndSeed} = require('../database/db');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

syncAndSeed();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/',router);
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.listen(port, () => (console.log(`listening in on port ${port}`)));