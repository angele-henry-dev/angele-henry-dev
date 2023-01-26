'use strict';

var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function (req, res) {
    res.render('index');
});

// POST message
router.get('/contact', function (req, res) {
    res.send(200, { message: 'mailto:angele.henry@outlook.com' });
});

module.exports = router;
