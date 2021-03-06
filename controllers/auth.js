const passport = require("passport");

const User = require("../models/user");

module.exports = {
	showIndex: (req, res) => {
		res.render('index');
	},

	showLogin: (req, res) => {
		res.render('login');
	},

	showRegister: (req, res) => {
		res.render('register');
	},

	createUser: (req, res) => {
		var password = req.body.password;
		var confirmationPassword = req.body.confirmPassword;
		console.log(password, confirmationPassword);
		if (password !== confirmationPassword) {
			req.flash("error", "The passwords do not match. Please try again.");
			res.redirect('/register');
		}
		User.register({ username: req.body.username }, req.body.password, (err, user) => {
			if (err) {
				console.log(err);
				req.flash("error", "Username already exists. Please Log In.");
				res.redirect('/register');
			} else {
				passport.authenticate("local")(req, res, function () {
					req.flash("success", "Welcome " + req.body.username)
					res.redirect("/update");
				});
			}
		});
	},

	loginUser: (req, res) => {
		req.flash("success", "Welcome " + user.username);
	},

	logoutUser: (req, res) => {
		req.logout();
		req.flash("success", "Logged Out Successfully.");
		res.redirect('/');
	}
};