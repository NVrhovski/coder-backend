import { Router } from "express";
import axios from "axios";

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    let data = []
    try {
        let response = await axios({
            url: 'http://localhost:8080/api/products',
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
            url: 'http://localhost:8080/api/products',
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
            url: 'http://localhost:8080/api/messages',
            method: 'GET'
        })
        data = response.data.payload;
    } catch (error) {
        console.log(error)
    }
    res.render('chat', {data})
})

viewsRouter.get('/products', async (req, res) => {
    if(req.session.user)
    {
        let data = []
        try {
            let response = await axios({
                url: `http://localhost:8080/api/products?limit=${req.query.limit || '10'}&page=${req.query.page || '1'}&sort=${req.query.sort || ''}&query=${req.query.query || ''}`,
                method: 'GET'
            });
            data = response.data
            data.user = req.session.user
        } catch (error) {
            console.log(error);
        }
        res.render('products', {data})
    }else
    {
        res.redirect('/login')
    }
})

viewsRouter.get('/products/:pid', async (req, res) => {
    if(req.session.user)
    {
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
    }else
    {
        res.redirect('/login')
    }
})

viewsRouter.get('/carts/:cid', async (req, res) => {
    if(req.session.user)
    {
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
    }else
    {
        res.redirect('/login')
    }
})

viewsRouter.get('/login', (req, res) => {
    if(req.session.user)
    {
        res.redirect('/products')
    }else
    {
        res.render('login', {})
    }
})

viewsRouter.get('/register', (req, res) => {
    res.render('register', {})
})

viewsRouter.get('/profile', (req, res) => {
    if(req.session.user)
    {
        const data = {user: req.session.user}
        res.render('profile', {data})
    }else
    {
        res.redirect('/login');
    }
})

export default viewsRouter