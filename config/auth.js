module.exports = {
    // to ensure that the valid user can enter the region
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        // req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/login');
    },
    // agar login nahi hai tabhi  login as register par route kar 
    // for the above reason this route is added
    forwardAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/title');
    }
};