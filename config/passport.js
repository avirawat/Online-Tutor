const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const secret = require('../config/secret');

const User = require('../models/user')
//passport.serializeUser is used for "Store user id in session"
passport.serializeUser(function(user, done){
    done(null, user._id);
});

//passport.deserializeUser is used for "getting user id from session, and use mongoose to search use id from collection"
passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
});

 

passport.use(new FacebookStrategy(secret.facebook, function(req,token, refreshToken, profile, done){
    
    //to search if profile is existed or not
    User.findOne({ facebook: profile.id}, function(err, user){
        if(err) return done(err);
        console.log("Authentication done")
        if(user){
            req.flash('loginMessage', "Successfully login with Facebook");
            return done(null,user);
        } else{
            //if user is not existed and create new user
            var newUser = new User();
            newUser.email = profile._json.email;
            newUser.facebook = profile.id;
            newUser.tokens.push({ kind: 'facebook', token: token});
            newUser.profile.name = profile.displayName;
                    //To get profile picture from facebook
            newUser.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=square';
        
                    //To save user in mongoose db
            newUser.save(function(err){
                    if(err) throw err;
                    req.flash('loginMessage', "Successfully login with FaceBook")
                    return done(null, newUser); 
            });
        }
    });
}));