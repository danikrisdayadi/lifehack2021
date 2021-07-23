// Import dependencies
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const Users = require('../../models/user');

/**
 * Configure passport to use local strategy.
 * Authenticates using email and password.
 */

passport.use(Users.createStrategy());

passport.serializeUser(Users.serializeUser());

passport.deserializeUser(Users.deserializeUser());

// Creates a JWT using secret key
exports.getToken = (user) => {
    return jwt.sign(user, process.env.PASSPORT_SECRET_KEY, {
        expiresIn: 10000
    });
};

// Options to control how token is extracted from request or verified
//const opts: IOptions = {};
const opts = Object.create({});
/**
 * Configuration to read JWT
 * from http Auth header with the scheme 'bearer'
 */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_SECRET_KEY;

exports.jwtPassport = passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        Users.findById(jwt_payload._id)
            .then((user) => {
                if (user) {
                    // User successfully authenticated
                    return done(null, user);
                } else {
                    // Credentials not valid
                    return done(null, false);
                }
            })
            .catch((err) => {
                console.log(err);
                return done(err, false);
            });
    })
);

// To verify user credentials using jwt
exports.verifyUser = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            res.status(403).json({
                success: false,
                errors: 'You are not authenticated!'
            });
        } else {
            req.user = user;
            return next();
        }
    })(req, res, next);
};
