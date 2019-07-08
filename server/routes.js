const express = require('express');
const path = require('path');
const {syncAndSeed, models} = require('../database/db');
const {School, Student} = models;
const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '../index.html'))
});

router.get('/api/schools', async (req, res, next) => {
    res.send( await School.findAll());
})

module.exports = router;