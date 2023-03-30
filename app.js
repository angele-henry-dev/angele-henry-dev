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

// Error handlers
app.use(function (req, res, next) {
    res.status(404);

    res.format({
        html: function () {
            const cards = require('./model/game_cards.json');
            res.render('404', { cards: cards });
        },
        json: function () {
            res.json({ error: 'Not found' });
        },
        default: function () {
            res.type('txt').send('Not found');
        }
    })
});

app.listen(port, () => { });
