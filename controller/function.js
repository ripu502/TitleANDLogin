const Tag = require('../models/Tag');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Sequelize = require('sequelize');


module.exports.error = (req, res, next) => {
    res.render('error');
}


module.exports.logout = (req, res, next) => {
    // res.render('error');
    req.logout();
    // req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
}

module.exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/title',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}


module.exports.title = (req, res, next) => {
    res.render('title');
}


module.exports.login = (req, res, next) => {
    res.render('login');
}

module.exports.register = (req, res, next) => {
    res.render('register');
}

module.exports.postRegister = (req, res, next) => {
    console.log(req.body);
    const { email, password, cpassword } = req.body;
    bcrypt.hash(password, 12)
        .then((hashPassword) => {
            User.create({
                email: email,
                password: hashPassword
            }).then((user) => {
                console.log(`user registered`)
                return user;
            }).catch((err) => {
                return console.log(`some err in post register ${err}`)
            })
        }).then(() => {
            console.log('user abc ');
        })
        .catch((err) => {
            console.log(err);
        });

}

module.exports.postTitle = (req, res, next) => {

    // res.send(req.body);
    const tags = req.body.title;
    // console.log(req.body.title);
    const tag = new Tag({
        tags: tags,
    });
    tag.save()
        .then(post => {
            console.log('Tag added');
            res.redirect('/title');
        })
        .catch((err) => {
            console.log(err);
        });
}