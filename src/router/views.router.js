import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    let data = []
    try {
        let response = await fetch('http://localhost:8080/api/products');
        let fullData = await response.json();
        data = fullData.payload;
    } catch (error) {
        console.log(error);
    }
    res.render('home', {data})
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    let data = []
    try {
        let response = await fetch('http://localhost:8080/api/products');
        let fullData = await response.json();
        data = fullData.payload;
    } catch (error) {
        console.log(error);
    }
    res.render('realTimeProducts', {data})
})

viewsRouter.get('/chat', async (req, res) => {
    let data = []
    try {
        let response = await fetch('http://localhost:8080/api/messages');
        let fullData = await response.json();
        data = fullData.payload;
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
            let response = await fetch(`http://localhost:8080/api/products?limit=${req.query.limit || '10'}&page=${req.query.page || '1'}&sort=${req.query.sort || ''}&query=${req.query.query || ''}`);
            data = await response.json();
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
            let response = await fetch(`http://localhost:8080/api/products/${req.params.pid}`);
            let json = await response.json();
            product = json.payload
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
            let response = await fetch(`http://localhost:8080/api/carts/${req.params.cid}`);
            let json = await response.json();
            cartProducts = json.payload
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