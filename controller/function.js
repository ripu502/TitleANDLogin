const Tag = require('../models/Tag');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Sequelize = require('sequelize');

// page not found
module.exports.error = (req, res, next) => {
    res.render('error');
}

// sending the login page
module.exports.login = (req, res, next) => {
    res.render('login');
}

// authenticating and login the user
module.exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/title',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}

// sending the registration page
module.exports.register = (req, res, next) => {
    res.render('register');
}

// posting the registration data to the postgres dataBase
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

// sending the form for adding the title or tags
module.exports.title = (req, res, next) => {
    res.render('title', {user : req.user});
}

// posting the titles or tags to the mongocloud
module.exports.postTitle = (req, res, next) => {
    const tags = req.body.title;
    const id = req.body.id;
    const tag = new Tag({
        userid : id,
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

// logging out the user
module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
}