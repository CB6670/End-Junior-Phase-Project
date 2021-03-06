const express = require('express');
const path = require('path');
const { models } = require('../database/db');
const { School, Student } = models;
const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../index.html'))
});

router.get('/api/schools', async (req, res, next) => {
    try {
        res.send(await School.findAll());
    } catch (err) {
        console.error(err);
    }
})

router.get('/api/schools/:id', async (req, res, next) => {
    try {
        res.send(await School.findOne({
            where: {
                id: req.params.id
            }
        }))
    } catch (err) {
        console.error(err);
    }
})

router.get('/api/students', async (req, res, next) => {
    try {
        res.send(await Student.findAll());
    } catch (err) {
        console.error(err);
    }
})

router.post('/api/students', async (req, res, next) => {
    try {
        res.send(await Student.create(req.body));
    } catch (err) {
        console.error(err);
    }
})

router.put('/api/students/:id', async (req, res, next) => {
    try {
        console.log("req's schoolId", req.body.schoolId)
        res.send(await Student.update({schoolId: req.body.schoolId}, {
            where: {
                id: req.params.id
            }
        }))
    } catch (err) {
        console.error(err);
    }
})

router.delete('/api/students/:id', async (req, res, next) => {
    try {
        console.log(req.params)
        await Student.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send(req.params.id);
    } catch (err) {
        console.error(err);
    }
})

router.get('/api/students/:id', async (req, res, next) => {
    try {
        res.send(await Student.findOne({
            where: {
                id: req.params.id
            }
        }))
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;