const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;

const config = require("../config/config");
const userModel = require("../models/user");
const blogModel = require("../models/blog");

const tokenExtractor = function (req) {
    let authorization = req.headers.authorization;
    if (authorization) {
        authorization = authorization.split(" ")[1];
        return authorization;
    }
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwt_token"];
    }
    return token;
};

var opts = {};
opts.jwtFromRequest = tokenExtractor;
opts.secretOrKey = config.secret;

exports.jwtPassport = passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        const user = await userModel.findById(payload.id);
        try {
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyPostOwner = async function (req, res, next) {
    const post = await blogModel.findById(req.params.id).populate("owner");
    if (!post) {
        return res.status(404).send("Post not found!");
    }
    const postOwnerId = post.owner.id;
    const requesterId = req.user.id;

    if (postOwnerId == requesterId) {
        return next();
    }

    res.status(401).json({
        status: false,
        msg: "You are not authorized!",
    });
};
