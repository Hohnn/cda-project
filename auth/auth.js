import passport from 'passport';
import { Strategy } from 'passport-local';

import UserModel from '../models/userModel.js';

import JWT from 'passport-jwt';

const { Strategy: JWTStrategy, ExtractJwt } = JWT;

passport.use(
    'signup',
    new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if (user) {
                return done(null, false, { message: 'Email already exists' });
            }
            const newUser = await UserModel.create({ email, password });
            return done(null, newUser);
        } catch (error) {
            return done(error);
        }
    })
)

passport.use(
    'login',
    new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'unknow email' });
            }
            const validate = await user.isValidPassword(password);
            if (!validate) {
                return done(null, false, { message: 'wrong password' });
            }

            return done(null, user, { message: 'login success' });
        } catch (error) {
            return done(error);
        }
    })
)

passport.use(
    new JWTStrategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token')
    },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                return done(error);
            }
        }
    )
)

export default passport;