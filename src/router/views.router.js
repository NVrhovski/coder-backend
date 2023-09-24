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
        console.log(error);
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
        console.log(error);
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
        console.log(error)
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
            console.log(error);
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
        } catch (error) {
            console.log(error);
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
            console.log(error);
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