import { Router } from "express";
import { CartManager } from "../../managers/cartManager.js";

const cartsRouter = Router();

const cartManager = new CartManager('src/data/carts.json');

cartsRouter.post('/', (req, res) => {
    cartManager.addCart();
    return res.status(200).json({status: 'Success', message: 'Carrito creado exitosamente'})
})

cartsRouter.get('/:cid', (req, res) => {
    const result = cartManager.getCartProducts(parseInt(req.params.cid));
    if(!result.status)
    {
        return res.status(200).json(result)
    }else
    {
        return res.status(400).json(result)
    }
})

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const result = cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid), req.body.quantity)
    if(result.status == 'Success')
    {
        return res.status(200).json(result)
    }else
    {
        return res.status(400).json(result)
    }
})

export default cartsRouter