var passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken')
const { User } = require('../db/models')
const secret = process.env.SECRET3;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    validateAdmin(jwt_payload.email, jwt_payload.password).then(
        response => {
            if (response.token) {
                return done(null, response)
            } else {
                return done(null, false)
            }
        }
    ).catch(e => console.log(e))
}));

async function validateAdmin(email, password){
    try {
        let message = "Wrong credentials"
        let user = await User.findOne({ email : email })
        if (user === null) return message;
        if (user.validPassword(password)) {
            let token = jwt.sign(
                {email: email, password: password},
                secret,
                { expiresIn: "14d" })
            return { token: "Bearer " + token }
        } else {
            return message;
        }
    } catch(e){
        throw e;
    }
}

async function signUp(user){
    try {
        let newUser = new User(user);
        newUser.setPassword(user.password);
        if (await User.exists({email: newUser.email})){
            throw new Error("Trying to save user that already exists");
        }
        await newUser.save();
        return "Sucessfully added";
    }catch(e){
        throw e;
    }
}

module.exports = { validateAdmin, signUp }

