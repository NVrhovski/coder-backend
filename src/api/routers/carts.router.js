import { Router } from "express";
import { addCart, addProductToCart, deleteProductsInCart, editCartProducts, editProductInCart, getCartProducts, payCart, removeProductFromCart } from "../controllers/carts.controller.js";
import passport from "passport";
import { userMiddleware } from "../../middleware/auth.middleware.js";

const cartsRouter = Router();

cartsRouter.post('/', addCart)

cartsRouter.get('/:cid', getCartProducts)

cartsRouter.put('/:cid', editCartProducts)

cartsRouter.delete('/:cid', deleteProductsInCart)

cartsRouter.post('/:cid/product/:pid', passport.authenticate('current'), userMiddleware, addProductToCart)

cartsRouter.put('/:cid/product/:pid', passport.authenticate('current'), userMiddleware, editProductInCart)

cartsRouter.delete('/:cid/product/:pid', passport.authenticate('current'), userMiddleware, removeProductFromCart)

cartsRouter.post('/purchase', passport.authenticate('current'), userMiddleware, payCart)

export default cartsRouter