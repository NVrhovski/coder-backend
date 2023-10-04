import passport from "passport";
import local from 'passport-local';
import userModel from '../api/dao/dbmanagers/models/user.model.js';
import cartModel from '../api/dao/dbmanagers/models/cart.model.js';
import { createHash, extractCookie, generateToken, isValidPassword } from "../utils.js";
import GitHubStrategy from 'passport-github2';
import passportJWT from 'passport-jwt';

const LocalStrategy = local.Strategy;
const JWTstrategy = passportJWT.Strategy;
const JWTextract = passportJWT.ExtractJwt;

const initializePassport = () => {

    passport.use('github', new GitHubStrategy(
        {
            clientID: process.env.CLIENT_GITHUB_ID,
            clientSecret: process.env.CLIENT_GITHUB_SECRET,
            callbackURL: `${process.env.HOST_URLPOINT}/api/session/githubcallback`
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({email: profile._json.email});
                if(user)
                {
                    user.token = generateToken(user);
                    return done(null, user)
                }

                const newCart = await cartModel.create({products: []})
                const newUser = {
                    name: profile._json.name,
                    email: profile._json.email,
                    password: '',
                    cartId: newCart._id.toString()
                }

                const result = await userModel.create(newUser);
                return done(null, result)
            } catch (error) {
                return done(`Github error: ${error}`)
            }
        }
    ))

    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
            const { first_name, last_name, email, age} = req.body;
            try {
                const user = await userModel.findOne({email: username});
                if(user)
                {
                    return done(null, false)
                }
                const newCart = await cartModel.create({products: []})
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    role: 'User',
                    cartId: newCart._id.toString()
                }
                const result = await userModel.create(newUser);
                return done(null, result)
            } catch (error) {
                return done(`Register error: ${error}`)
            }
        }
    ));

    passport.use('login', new LocalStrategy(
        {
            usernameField: 'email'
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({email: username}).lean().exec();
                if(!user)
                {
                    return done(null, false);
                }
                if(!isValidPassword(user, password))
                {
                    return done(null, false);
                }
                
                user.token = generateToken(user);
                return done(null, user)
            } catch (error) {
                return done(`Login error: ${error}`)
            }
        }
    ));

    passport.use('current', new JWTstrategy(
        {
            jwtFromRequest: JWTextract.fromExtractors([extractCookie]),
            secretOrKey: process.env.JWT_SECRET
        },
        async (jwt_payload, done) => {
            return done(null, jwt_payload)
        }
    ))

    passport.serializeUser((session_info, done) => {
        done(null, session_info._id || session_info.user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user)
    })
}

export default initializePassport