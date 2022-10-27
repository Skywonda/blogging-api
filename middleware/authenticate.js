const passport = require("passport")
const ExtractJwt = require("passport-jwt").ExtractJwt
const JwtStrategy = require("passport-jwt").Strategy

const config = require("../config/config")
const userModel = require("../models/user")

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.secret

exports.jwtPassport = passport.use(new JwtStrategy(opts, async (payload, done) => {
    const user = await userModel.findById(payload.id)
    try {
        return done(null, user)
    }
    catch (err) {
        return done(err, false)
    }

}))

exports.verifyUser = passport.authenticate('jwt', { session: false })