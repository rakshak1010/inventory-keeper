const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local');

passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
