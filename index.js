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

app.get('/singer', (req, res) => {
    Singer.find({})
    .then(singers => res.render('singer', { singers }));
});

app.get('/add', (req, res) => {
    res.render('add');
});

// CHUA XU LY
app.get('/remove/:id', (req, res) => {
   const { id } = req.params;
   Singer.findByIdAndRemove(id)
   .then((singer) => {
        fs.unlinkSync('./public/' + singer.image);
       res.redirect('/singer');
    })
    .catch(err => {
        res.send(err.message);
    });
});

app.get('/update/:id', (req, res) => {
    res.render('update');
});

const saveFile = upload.single('image');

// CHUA XU LY
app.post('/singer', (req, res) => {
    saveFile(req, res, err => {
        if (err) {
            return res.send('Bi loi roi: ' + err.message);
        }
        const { name } = req.body;
        const image = req.file.filename;
        const singer = new Singer({ name, image });
        singer.save()
        .then(() => res.redirect('/singer'));
    });
});

app.listen(3000, () => console.log('Server started'));

reload(app);
