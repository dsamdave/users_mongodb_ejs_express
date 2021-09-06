const express = require('express');
const mongoose = require('mongoose');
const User = require('./views/model/users');


const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))


const dbURI = 'mongodb+srv://dsamdave:dsamdave@cluster0.xm2tg.mongodb.net/auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/', (req, res) => {
    const user = new User(req.body)
    user.save()
        .then((result) => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
});