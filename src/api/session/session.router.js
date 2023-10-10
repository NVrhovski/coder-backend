import { Router } from "express"
import passport from "passport";
import UserDTO from "../dao/dto/user.dto.js";
import { createHash, decryptToken, generateToken, isValidPassword } from "../../utils.js";
import { transport } from "../../config/config.js";
import moment from "moment/moment.js";
import userModel from "../dao/dbmanagers/models/user.model.js";

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
    const normalizedUser = new UserDTO(req.user.user);
    return res.status(200).json({status: 'Success', payload: normalizedUser})
})

sessionRouter.post('/recover', (req, res) => {
    if(req.body.email)
    {
        const token = generateToken({email: req.body.email, timestamp: moment().format()});
        transport.sendMail({
            from: 'neyenvrhovski@gmail.com',
            to: req.body.email,
            subject: 'Password recovery',
            html: `
                <table>
                    <a target="_blank" href="${process.env.HOST_URL}/password-recovery?t=${token}">
                        <button>Recover password</button>
                    </a>
                </table>
            `
        })
        return res.redirect('/redirect-sended')
    }else
    {
        return res.status(400).json({status: 'Error', error: 'Need email'})
    }
})

sessionRouter.post('/check-password', async (req, res) => {
    const user = await userModel.findOne({email: req.body.email}).lean().exec();
    if(isValidPassword(user, req.body.password)) return res.status(400).json({status: 'Error', error: 'You cant use the same password'})
    return res.status(200).json({status: 'Success', payload: 'Valid password'})
})

sessionRouter.post('/change-password', async (req, res) => {
    try {
        const user = await userModel.findOneAndUpdate({email: req.body.email}, {password: createHash(req.body.password)});
        if(user)
        {
            return res.status(200).json({status: 'Success', payload: 'Password changed'})
        }else
        {
            return res.status(400).json({status: 'Error', error: 'User not found'})
        }
    } catch (error) {
        req.logger.error(`Cant change password - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error})
    }
})

sessionRouter.post('/premium/:uid', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.uid);
        if(user.role == 'Premium')
        {
            const message = await userModel.findByIdAndUpdate(req.params.uid, {role: 'User'})
            return res.status(200).json({status: 'Success', payload: message})
        }else
        {
            const message = await userModel.findByIdAndUpdate(req.params.uid, {role: 'Premium'})
            return res.status(200).json({status: 'Success', payload: message})
        }
    } catch (error) {
        req.logger.error(`Cant change role - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error})
    }
})

export default sessionRouter