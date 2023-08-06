import { Router } from "express"
import { SessionManager } from "../../dao/dbmanagers/sessionManager.js";

const sessionRouter = Router();

const sessionManager = new SessionManager();

async function registerMiddleware(req, res, next){
    const check = await sessionManager.exist(req.body.email);
    if(check)
    {
        return res.status(401).json({status: 'Error', message: 'Email already registered'})
    }else
    {
        next();
    }
}

sessionRouter.post('/register', registerMiddleware, async (req, res) => {
    await sessionManager.register(req.body);

    return res.redirect('/login')
});

sessionRouter.post('/login', async (req, res) => {
    const user = await sessionManager.login(req.body.email, req.body.password);
    if(user)
    {
        req.session.user = user;
        res.redirect('/products');
    }else
    {
        res.redirect('/login')
    }
})

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

export default sessionRouter