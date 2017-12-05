const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const uid = require('uid');
const reload = require('reload');
const fs = require('fs');
const upload = require('./uploadConfig');
const Singer = require('./db');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.redirect('/singer'));

// CHUA XU LY
app.get('/singer', (req, res) => {
    Singer.find({})
    .then(singers => res.render('singer', { singers }));
});

app.get('/add', (req, res) => {
    res.render('add');
});

// CHUA XU LY
app.get('/remove/:id', (req, res) => {
   
});

const saveFile = upload.single('image');

// CHUA XU LY
app.post('/singer', (req, res) => {
    saveFile(req, res, err => {
        res.send('Saved');
    });
});

app.listen(3000, () => console.log('Server started'));

reload(app);
