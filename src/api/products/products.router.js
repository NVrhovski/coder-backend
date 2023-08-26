import { Router } from "express"
import { ProductManager } from "../../dao/dbmanagers/productManager.js";

const productsRouter = Router();

const productManager = new ProductManager();

productsRouter.get('/', async (req, res) => {
    try {
        const message = await productManager.getProducts(req.query);
        const data = message.docs;
        delete message.docs;
        console.log(data);
        return res.status(200).json({status: 'Success', payload: data, ...message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
})

productsRouter.get('/:id', async (req, res) => {
    try {
        const message = await productManager.getProductById(req.params.id);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const message = await productManager.addProduct({...req.body});
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
})

productsRouter.put('/:id', async (req, res) => {
    try {
        const message = await productManager.updateProduct({productId: req.params.id, ...req.body});
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
})

productsRouter.delete('/:id', async (req, res) => {
    try {
        const message = await productManager.deleteProduct(req.params.id);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
})

export default productsRouter