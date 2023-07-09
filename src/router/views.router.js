import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    let data = []
    try {
        let response = await fetch('http://localhost:8080/api/products');
        data = await response.json()
    } catch (error) {
        console.log(error);
    }
    res.render('home', {data})
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    let data = []
    try {
        let response = await fetch('http://localhost:8080/api/products');
        data = await response.json()
    } catch (error) {
        console.log(error);
    }
    res.render('realTimeProducts', {data})
})

export default viewsRouter