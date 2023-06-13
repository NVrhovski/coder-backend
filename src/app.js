import express from 'express';
import { ProductManager } from './productManager.js';

const app = express();
app.use(express.json());

const manager = new ProductManager('src/data.json');

app.get('/products', (req, res) => {
    let data = manager.getProducts();
    if(req.query.limit && parseInt(req.query.limit) < data.length && parseInt(req.query.limit) >= 0)
    {
        data.length = parseInt(req.query.limit)
        return res.status(200).json(data)
    }else
    {
        return res.status(200).json(data)
    }
})

app.get('/products/:id', (req, res) => {
    let item = manager.getProductById(parseInt(req.params.id));
    if(item)
    {
        return res.status(200).json(item)
    }else
    {
        return res.status(400).json({status: 'Error', message: 'Producto no encontrado'})
    }
})

app.listen(8080)