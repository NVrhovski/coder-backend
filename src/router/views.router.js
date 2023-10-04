import { Router } from "express";
import axios from "axios";
import passport from "passport";
import { decryptToken } from "../utils.js";

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    let data = []
    try {
        let response = await axios({
            url: `${process.env.API_ENDPOINT}/products`,
            method: 'GET'
        })
        data = response.data.payload;
    } catch (error) {
        req.logger.error(`Cant get products info - ${new Date().toLocaleDateString()}`)
    }
    res.render('home', {data})
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    let data = []
    try {
        let response = await axios({
            url: `${process.env.API_ENDPOINT}/products`,
            method: 'GET'
        })
        data = response.data.payload;
    } catch (error) {
        req.logger.error(`Cant get products info - ${new Date().toLocaleDateString()}`)
    }
    res.render('realTimeProducts', {data})
})

viewsRouter.get('/chat', async (req, res) => {
    let data = []
    try {
        let response = await axios({
            url: `${process.env.API_ENDPOINT}/messages`,
            method: 'GET'
        })
        data = response.data.payload;
    } catch (error) {
        req.logger.error(`Cant get messages - ${new Date().toLocaleDateString()}`)
    }
    res.render('chat', {data})
})

viewsRouter.get('/products', passport.authenticate('current', {failureRedirect: '/login'}), async (req, res) => {
        let data = []
        try {
            let response = await axios({
                url: `http://localhost:8080/api/products?limit=${req.query.limit || '10'}&page=${req.query.page || '1'}&sort=${req.query.sort || ''}&query=${req.query.query || ''}`,
                method: 'GET'
            });
            data = response.data
            data.user = req.user.user
        } catch (error) {
            req.logger.error(`Cant get products info - ${new Date().toLocaleDateString()}`)
        }
        res.render('products', {data})
})

viewsRouter.get('/products/:pid', passport.authenticate('current', {failureRedirect: '/login'}), async (req, res) => {
        let product = []
        try {
            let response = await axios({
                url: `http://localhost:8080/api/products/${req.params.pid}`,
                method: 'GET'
            })
            product = response.data.payload
            product.cartId = req.user.user.cartId
        } catch (error) {
            req.logger.error(`Cant get product info - ${new Date().toLocaleDateString()}`)
        }
        res.render('productDetail', {product})
})

viewsRouter.get('/carts/:cid', passport.authenticate('current', {failureRedirect: '/login'}), async (req, res) => {
        let cartProducts = []
        try {
            let response = await axios({
                url: `http://localhost:8080/api/carts/${req.params.cid}`,
                method: 'GET'
            })
            cartProducts = response.data.payload
        } catch (error) {
            req.logger.error(`Cant get cart info - ${new Date().toLocaleDateString()}`)
        }
        res.render('cartDetail', {cartProducts})
})

viewsRouter.get('/login', (req, res) => {
    const token = req.cookies.keyCookieForJWT
    if(token)
    {
        const user = decryptToken(token)
        if(user)
        {
            res.redirect('/products')
        }else
        {
            res.render('login', {})
        }
    }else
    {
        res.render('login', {})
    }
})

viewsRouter.get('/register', (req, res) => {
    res.render('register', {})
})

viewsRouter.get('/profile', passport.authenticate('current', {failureRedirect: '/login'}), (req, res) => {
    const data = {user: req.user.user}
    res.render('profile', {data})
})

viewsRouter.get('/checkout', passport.authenticate('current', {failureRedirect: '/login'}), (req, res) => {
    const data = {user: req.user.user}
    res.render('checkout', {data})
})

export default viewsRouter