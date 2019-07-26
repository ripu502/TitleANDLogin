
module.exports.error = (req, res, next) => {
    res.render('error');
}


module.exports.title = (req, res, next) => {
    res.render('title');
}

module.exports.postTitle = (req, res, next) => {
    res.send(req.body);
}