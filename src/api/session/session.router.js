import { Router } from "express"
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post('/register', passport.authenticate('register', {
    failureRedirect: '/register'
}), async (req, res) => {
    return res.redirect('/login')
});

sessionRouter.post('/login', passport.authenticate('login', '/login'), async (req, res) => {
    return res.cookie('keyCookieForJWT', req.user.token).redirect('/products')
})

sessionRouter.get('/logout', (req, res) => {
    return res.clearCookie('keyCookieForJWT').redirect('/login')
})

sessionRouter.get('/login-github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {

})

sessionRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/'}), async (req, res) => {
    return res.cookie('keyCookieForJWT', req.user.token).redirect('/profile')
})

sessionRouter.get('/current', passport.authenticate('current', {failureMessage: 'Error: no se encontro usuario'}), (req, res) => {
    return res.status(200).json({status: 'Success', payload: req.user.user})
})

export default sessionRouter