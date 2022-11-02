const passport = require("passport")
const ExtractJwt = require("passport-jwt").ExtractJwt
const JwtStrategy = require("passport-jwt").Strategy

const config = require("../config/config")
const userModel = require("../models/user")
const blogModel = require("../models/blog")

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

exports.veriryPostOwner = async function (req, res, next) {
    const post = await blogModel.findById(req.params.id).populate("owner")
    if (!post) {
        return res.status(404).send("Post not found!")
    }
    const postOwnerId = post.owner.id
    const requesterId = req.user.id

    if (postOwnerId == requesterId) {
        return next()
    }

    res.status(401).json({
        status: false,
        msg: "You are not authorized!"
    })
}
