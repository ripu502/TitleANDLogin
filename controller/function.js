const Tag = require('../models/Tag');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Sequelize = require('sequelize');
const { validationResult } = require('express-validator');

// page not found
module.exports.error = (req, res, next) => {
    res.render('error');
}

// sending the login page
module.exports.login = (req, res, next) => {
    res.render('login',
        {
            msg: req.flash('error')
        });
}

// authenticating and login the user
module.exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}

// getting tags of loged user
module.exports.dashboard = (req, res, next) => {
    const user = req.user;
    Tag.findOne({ userid: user.id }).then(u => {
        if (u) {

            res.render('dashboard',
                {
                    username: user.email,
                    tags: u.tags
                });
        } else {
            res.redirect('/title');
        }
    })
}

// sending the registration page
module.exports.register = (req, res, next) => {
    res.render('register',
        {
            msg: req.flash('error')
        });
}

// posting the registration data to the postgres dataBase
module.exports.postRegister = (req, res, next) => {
    console.log(req.body);
    const error = validationResult(req);
    console.log(error);
    if (!error.isEmpty()) {
        req.flash('error', 'some error happen');
        return res.status(422).render('register',
            {
                msg: req.flash('error')
            });
    }
    const { email, password, cpassword } = req.body;
    bcrypt.hash(password, 12)
        .then((hashPassword) => {
            User.create({
                email: email,
                password: hashPassword
            }).then((user) => {
                console.log(`user registered`)
                res.redirect('/login');
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
    res.render('title', {
        user: req.user,
        msg: req.flash('error')
    });
}

// posting the titles or tags to the mongocloud
module.exports.postTitle = (req, res, next) => {
    const tags = req.body.title;
    const error = validationResult(req);
    console.log(error);
    if (!error.isEmpty()) {
        req.flash('error', 'some error happen');
        return res.status(422).render('title',
            {
                user: req.user,
                msg: req.flash('error')
            });
    }
    let newArray = tags.filter(function (element) {
        if (element != '') return element;
    });
    const id = req.body.id;
    Tag.findOne({ userid: id }).then(u => {
        if (!u) {
            const tag = new Tag({
                userid: id,
                tags: newArray,
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
        else {
            let t = u.tags.concat(newArray);
            u.tags = t;
            u.save()
                .then(post => {
                    console.log('Tag added');
                    res.redirect('/title');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }).catch(err => {
        console.log(`some err occured in finding the user in mongo after login ${err}`);
    })

}

// logging out the user
module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
}