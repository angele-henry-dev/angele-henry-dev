'use strict';
var express = require('express');
var router = express.Router();

// Data
const userNames = ["Sean", "George", "Roger", "Timothy", "Pierce", "Daniel"];
const bestMovie = "Casino Royale";
const licensedToKill = false;

// GET home page
router.get('/', function (req, res) {
    res.render('index', {
        userNames,
        bestMovie,
        licensedToKill
    });
});
// GET contact page
router.get('/contact', function (req, res) {
    res.render('contact', {userNames});
});

module.exports = router;
