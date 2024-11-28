const express = require('express')
const flash = require('express-flash');
const session = require('express-session');

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
}));
app.use(flash());


app.get('/', (req, res) => {
    // res.send()
    req.flash('info', 'Flash Message Added');
    res.render('index');
    // res.redirect('/show-flash-message');
})

app.get('/data', (req, res) => {
    // res.send()
    req.flash('info', 'Flash Message Added');
    res.json(
        { messages: req.flash('info') }
    )
})


app.get('/show-flash-message', (req, res) => {
    req.flash('info', 'Flash Message Added');
    res.render('index', { messages: req.flash('info') });
})

app.listen(8000)