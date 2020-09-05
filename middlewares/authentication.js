module.exports = {
    checkLoginWithError: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            req.flash("error", "Log in first!")
            res.redirect("/login");
        }
    },
    checkLoginNoError: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect("/update");
        } else {
            next();
        }
    }
};