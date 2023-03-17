const express = require('express');
const port = 3000;
const path = require('path');
const routes = require('./routes/routes');

let app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use((req, res, next) => {
    next();
});

app.get('/404', function (req, res, next) {
    // trigger a 404 since no other middleware
    // will match /404 after this one, and we're not
    // responding here
    next();
});

// Error handlers

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.
const cards = [
    {
        id: "pug1",
        src: "/images/pug.png"
    },
    {
        id: "python1",
        src: "/images/python.png"
    },
    {
        id: "cloud1",
        src: "/images/cloud.png"
    },
    {
        id: "painter1",
        src: "/images/painter.png"
    },
    {
        id: "iot1",
        src: "/images/iot.png"
    },
    {
        id: "plane1",
        src: "/images/plane.png"
    },
    {
        id: "intranet1",
        src: "/images/intranet.png"
    },
    {
        id: "dentist1",
        src: "/images/dentist.png"
    },
    {
        id: "study1",
        src: "/images/study.png"
    },
    {
        id: "radio1",
        src: "/images/radio.png"
    },
    {
        id: "pug2",
        src: "/images/pug.png"
    },
    {
        id: "python2",
        src: "/images/python.png"
    },
    {
        id: "cloud2",
        src: "/images/cloud.png"
    },
    {
        id: "painter2",
        src: "/images/painter.png"
    },
    {
        id: "iot2",
        src: "/images/iot.png"
    },
    {
        id: "plane2",
        src: "/images/plane.png"
    },
    {
        id: "intranet2",
        src: "/images/intranet.png"
    },
    {
        id: "dentist2",
        src: "/images/dentist.png"
    },
    {
        id: "study2",
        src: "/images/study.png"
    },
    {
        id: "radio2",
        src: "/images/radio.png"
    },
];
app.use(function (req, res, next) {
    res.status(404);

    res.format({
        html: function () {
            res.render('404', { cards: cards })
        },
        json: function () {
            res.json({ error: 'Not found' })
        },
        default: function () {
            res.type('txt').send('Not found')
        }
    })
});

app.listen(port, () => { });
