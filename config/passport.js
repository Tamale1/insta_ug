const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  // Authenticate users with email and password
  passport.use(
    new LocalStrategy(
      
    
    async (username, password, done) => {
      try {
        const user = User.findOne({ username: email.toLowerCase() });
        if (!user) {
          return done(null, false, { msg: `Email ${username} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: "Invalid email or password." });
      } catch (err) {
        return done(err);
      }
    }
  )

  ///
  )
// Serialize users to their ID


passport.serializeUser((user, cb)=>{
  cb(null,{id: user.id, username:user.username})
  }),


  passport.deserializeUser(async(id, done)=>{
    try {
          const user = await User.findById(id);
          done(null, user);
        } catch (err) {
          done(err, null);
        }
  })








}

  