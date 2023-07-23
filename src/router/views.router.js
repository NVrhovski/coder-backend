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


export default viewsRouter