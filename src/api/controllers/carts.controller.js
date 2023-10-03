import { CartService, ProductService } from '../repositories/index.js';
import { generateCode } from '../../utils.js';
import { transport } from '../../config/config.js';
import CustomError from '../../errors/custom_error.js';
import { generateUnknowCartError } from '../../errors/info.js';
import EErrors from '../../errors/enums.js';

export const addCart = async (req, res) => {
    try {
        const message = await CartService.addCart();
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        req.logger.error(`Cant add cart - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error})
    }
}

export const getCartProducts = async (req, res) => {
    try {
        const message = await CartService.getCartProducts(req.params.cid);
        if(!message)
        {
            CustomError.createError({
                name: 'Unknow cart error',
                cause: generateUnknowCartError(req.params.cid),
                message: 'Error while retrieving cart',
                code: EErrors.UNKNOW_CART_ERROR
            })
        }
        return res.status(200).json({status: 'Success', payload: message.products})
    } catch (error) {
        req.logger.error(`Cant get products info - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error: error.name, cause: error.cause})
    }
}

export const addProductToCart = async (req, res) => {
    try {
        let oldCart = await CartService.getCartProducts(req.params.cid);
        if(!oldCart)
        {
            CustomError.createError({
                name: 'Unknow cart error',
                cause: generateUnknowCartError(req.params.cid),
                message: 'Error while retrieving cart',
                code: EErrors.UNKNOW_CART_ERROR
            })
        }
        const message = await CartService.addProductToCart(req.params.cid, req.params.pid, req.body.quantity, oldCart.products);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        req.logger.error(`Cant add product to cart - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error: error.name, cause: error.cause})
    }
}

export const removeProductFromCart = async (req, res) => {
    try {
        let oldCart = await CartService.getCartProducts(req.params.cid);
        if(!oldCart)
        {
            CustomError.createError({
                name: 'Unknow cart error',
                cause: generateUnknowCartError(req.params.cid),
                message: 'Error while retrieving cart',
                code: EErrors.UNKNOW_CART_ERROR
            })
        }
        const message = await CartService.removeProductFromCart(req.params.cid, req.params.pid, oldCart.products);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        req.logger.error(`Cant remove product from cart - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error: error.name, cause: error.cause})
    }
}

export const editCartProducts = async (req, res) => {
    try {
        const message = await CartService.editCartProducts(req.params.cid, req.body.newProducts);
        if(!message)
        {
            CustomError.createError({
                name: 'Unknow cart error',
                cause: generateUnknowCartError(req.params.cid),
                message: 'Error while retrieving cart',
                code: EErrors.UNKNOW_CART_ERROR
            })
        }
        return res.status(200).json({status: 'Success', payload: message.products})
    } catch (error) {
        req.logger.error(`Cant edit cart products - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error: error.name, cause: error.cause})
    }
}

export const editProductInCart = async (req, res) => {
    try {
        let oldCart = await CartService.getCartProducts(req.params.cid);
        if(!oldCart)
        {
            CustomError.createError({
                name: 'Unknow cart error',
                cause: generateUnknowCartError(req.params.cid),
                message: 'Error while retrieving cart',
                code: EErrors.UNKNOW_CART_ERROR
            })
        }
        const message = await CartService.editProductInCart(req.params.cid, req.params.pid, req.body.quantity, oldCart.products);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        req.logger.error(`Cant edit product in cart - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error: error.name, cause: error.cause})
    }
}

export const deleteProductsInCart = async (req, res) => {
    try {
        const message = await CartService.deleteProductsInCart(req.params.cid);
        if(!message)
        {
            CustomError.createError({
                name: 'Unknow cart error',
                cause: generateUnknowCartError(req.params.cid),
                message: 'Error while retrieving cart',
                code: EErrors.UNKNOW_CART_ERROR
            })
        }
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        req.logger.error(`Cant delete product from cart - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error: error.name, cause: error.cause})
    }
}

export const payCart = async (req, res) => {
    try {
        let oldCart = await CartService.getCartProducts(req.user.user.cartId);
        if(!oldCart)
        {
            CustomError.createError({
                name: 'Unknow cart error',
                cause: generateUnknowCartError(req.params.cid),
                message: 'Error while retrieving cart',
                code: EErrors.UNKNOW_CART_ERROR
            })
        }
        let nonStockProducts = [];
        let productsToSell = [];
        let amount = 0;
        let test = 0;
        oldCart.products.forEach((el) => {
            if(el.product.stock < el.quantity)
            {
                nonStockProducts.push(el.product._id.toString());
            }else
            {
                let product = {...el.product}._doc;
                productsToSell.push({...product, productId: el.product._id.toString(), stock: (el.product.stock - el.quantity)});     
                amount += el.quantity * el.product.price;
            }
            test++
        })
        productsToSell.forEach((product) => {
            ProductService.updateProduct(product);
            let productIndex = oldCart.products.map(el => el.product._id.toString()).indexOf(product.productId)
            oldCart.products.splice(productIndex, 1);
        }) 
        CartService.editCartProducts(req.user.user.cartId, oldCart.products);
        const code = generateCode();
        const message = await CartService.payCart(amount, req.user.user.email, code);
        transport.sendMail({
            from: 'neyenvrhovski@gmail.com',
            to: req.user.user.email,
            subject: 'Tu ticket de compra',
            html: `
                <table>
                    <tbody>
                        <tr>
                            <td>Código:</td>
                            <td>${message.code}</td>
                        </tr>
                        <tr>
                            <td>Fecha:</td>
                            <td>${message.purchase_datetime}</td>
                        </tr>
                        <tr>
                            <td>Total:</td>
                            <td>${message.amount}</td>
                        </tr>
                    </tbody>
                </table>
            `
        })
        return res.status(200).json({status: 'Success', payload: {ticket: message, nonStockProducts}})
    } catch (error) {
        req.logger.error(`Cant pay cart - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error: error.name, cause: error.cause})
    }
}