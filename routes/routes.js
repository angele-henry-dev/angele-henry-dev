'use strict';
var express = require('express');
var router = express.Router();

// Data
let panelNumber = 0;

// GET home page
router.get('/', function (req, res) {
    res.render('index', { panelNumber });
});

module.exports = router;
