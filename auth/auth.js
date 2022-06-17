import passport from 'passport'
import { Strategy } from 'passport-local'
import UserModel from '../models/userModel.js'
import JWT from 'passport-jwt'
import AppError from '../utils/AppError.js'

const { Strategy: JWTStrategy, ExtractJwt } = JWT

//signup strategy
passport.use(
    'signup',
    new Strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        async (req, email, password, done) => {
            try {
                const user = await UserModel.findOne({ email })
                if (user) {
                    return done({
                        message: `Adresse ${user.email} deja utilisée.`
                    })
                }
                const newUser = await UserModel.create({
                    email,
                    password,
                    key_r: req.body.key_r < 3 ? req.body.key_r : req.body.key_r = 3,
                    ...req.body
                })
                return done(null, newUser)
            } catch (error) {
                return done(error)
            }
        })
)

// login strategy
passport.use(
    'login',
    new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email })
                if (!user) {
                    return next(new AppError(`Email ${email} inconnu.`, 400))
                }
                const details = {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName_u,
                    lastName: user.lastName_u
                }
                const validate = await user.isValidPassword(password)
                if (!validate) {
                    return next(new AppError(`Erreur de connexion.`, 400))
                }
                return done(null, user, {
                    message: 'Connexion réussie.',
                    details
                })
            } catch (error) {
                return done(error)
            }
        })
)

// JWT strategy
passport.use(
    new JWTStrategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
        async (token, done) => {
            try {
                return done(null, token.user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

export default passport