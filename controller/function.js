const Tag = require('../models/Tag');

module.exports.error = (req, res, next) => {
    res.render('error');
}


module.exports.title = (req, res, next) => {
    res.render('title');
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