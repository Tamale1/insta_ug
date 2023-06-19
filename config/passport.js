const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  // Authenticate users with email and password
  passport.use(
    new LocalStrategy(async(email, password, done)=>{
      
    
     
      try {
        await User.findOne({ username: email.toLowerCase() },(err, user)=>{
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
           }
           const isMatch =  user.comparePassword(password);
           if (isMatch) {
             return done(null, user);
           }
           return done(null, false, { msg: "Invalid email or password." });
           
       
        });
      
        
      } catch (err) {
        return done(err);
      }
    }
  )

  ///
  )
// Serialize users to their ID

passport.serializeUser((user, done) => {
  done(null, user.id);
});



  passport.deserializeUser(async(id, done)=>{
    try {
          const user = await User.findById(id);
          done(null, user);
        } catch (err) {
          done(err, null);
        }
  })








}

  