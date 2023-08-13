import passport from "passport";
import local from 'passport-local';
import userModel from "../dao/dbmanagers/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from 'passport-github2';

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.b179c276b165fbda',
            clientSecret: '50c908eb9510d26ba71ab2b64ad3c345136eb5cc',
            callbackURL: 'http://localhost:8080/api/session/githubcallback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({email: profile._json.email});
                if(user)
                {
                    return done(null, user)
                }

                const newUser = {
                    name: profile._json.name,
                    email: profile._json.email,
                    password: ''
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

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    role: 'User'
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
                
                return done(null, user)
            } catch (error) {
                return done(`Login error: ${error}`)
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user)
    })
}

export default initializePassport

// App ID: 375324

// Client ID: Iv1.b179c276b165fbda

// 50c908eb9510d26ba71ab2b64ad3c345136eb5cc 