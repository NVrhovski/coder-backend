import CartsService from "../services/carts.service.js";

const cartService = new CartsService();

export const addCart = async (req, res) => {
    try {
        const message = await cartService.addCart();
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}

export const getCartProducts = async (req, res) => {
    try {
        const message = await cartService.getCartProducts(req.params.cid);
        return res.status(200).json({status: 'Success', payload: message.products})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}

export const addProductToCart = async (req, res) => {
    try {
        let oldCart = await cartService.getCartProducts(req.params.cid);
        const message = await cartService.addProductToCart(req.params.cid, req.params.pid, req.body.quantity, oldCart.products);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}

export const removeProductFromCart = async (req, res) => {
    try {
        let oldCart = await cartService.getCartProducts(req.params.cid);
        console.log(oldCart)
        const message = await cartService.removeProductFromCart(req.params.cid, req.params.pid, oldCart.products);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}

export const editCartProducts = async (req, res) => {
    try {
        const message = await cartService.editCartProducts(req.params.cid, req.body.newProducts);
        return res.status(200).json({status: 'Success', payload: message.products})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}

export const editProductInCart = async (req, res) => {
    try {
        let oldCart = await cartService.getCartProducts(req.params.cid);
        const message = await cartService.editProductInCart(req.params.cid, req.params.pid, req.body.quantity, oldCart.products);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}

export const deleteProductsInCart = async (req, res) => {
    try {
        const message = await cartService.deleteProductsInCart(req.params.cid);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}