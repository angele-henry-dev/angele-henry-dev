'use strict';

var express = require('express');
var fs = require('fs');
var router = express.Router();

// Define models
const skillsModel = require('../model/skills.json');
const experienceModel = require('../model/experience.json');

// GET home page
router.get('/', function (req, res) {
    const data = {
        skills: skillsModel,
        experience: experienceModel
    };
    res.render('index', data);
});

// GET address mail
router.get('/contact', function (req, res) {
    res.status(200).send({ message: 'mailto:angele.henry@outlook.com' });
});

module.exports = router;
