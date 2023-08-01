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
    let data = []
    try {
        let response = await fetch(`http://localhost:8080/api/products?limit=${req.query.limit || '10'}&page=${req.query.page || '1'}&sort=${req.query.sort || ''}&query=${req.query.query || ''}`);
        data = await response.json();
    } catch (error) {
        console.log(error);
    }
    res.render('products', {data})
})

viewsRouter.get('/products/:pid', async (req, res) => {
    let product = []
    try {
        let response = await fetch(`http://localhost:8080/api/products/${req.params.pid}`);
        let json = await response.json();
        product = json.payload
    } catch (error) {
        console.log(error);
    }
    res.render('productDetail', {product})
})

viewsRouter.get('/carts/:cid', async (req, res) => {
    let cartProducts = []
    try {
        let response = await fetch(`http://localhost:8080/api/carts/${req.params.cid}`);
        let json = await response.json();
        cartProducts = json.payload
    } catch (error) {
        console.log(error);
    }
    res.render('cartDetail', {cartProducts})
})

export default viewsRouter