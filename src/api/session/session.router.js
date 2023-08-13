import { Router } from "express"
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post('/register', passport.authenticate('register', {
    failureRedirect: '/register'
}), async (req, res) => {
    return res.redirect('/login')
});

sessionRouter.post('/login', passport.authenticate('login', '/login'), async (req, res) => {

    req.session.user = req.user;

    return res.redirect('/products');
})

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

sessionRouter.get('/login-github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {

})

sessionRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/'}), async (req, res) => {
    req.session.user = req.user;
    return res.redirect('/profile')
})

export default sessionRouter