import { Router } from "express";
import { CartManager } from "../../dao/dbmanagers/cartManager.js";

const cartsRouter = Router();

const cartManager = new CartManager();

cartsRouter.post('/', async (req, res) => {
    try {
        const message = await cartManager.addCart();
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const message = await cartManager.getCartProducts(req.params.cid);
        return res.status(200).json({status: 'Success', payload: message.products})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        let oldCart = await cartManager.getCartProducts(req.params.cid);
        const message = await cartManager.addProductToCart(req.params.cid, req.params.pid, req.body.quantity, oldCart.products);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
})

export default cartsRouter