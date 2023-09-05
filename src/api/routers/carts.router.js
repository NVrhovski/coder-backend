import { Router } from "express";
import { addCart, addProductToCart, deleteProductsInCart, editCartProducts, editProductInCart, getCartProducts, removeProductFromCart } from "../controllers/carts.controller.js";

const cartsRouter = Router();

cartsRouter.post('/', addCart)

cartsRouter.get('/:cid', getCartProducts)

cartsRouter.put('/:cid', editCartProducts)

cartsRouter.delete('/:cid', deleteProductsInCart)

cartsRouter.post('/:cid/product/:pid', addProductToCart)

cartsRouter.put('/:cid/product/:pid', editProductInCart)

cartsRouter.delete('/:cid/product/:pid', removeProductFromCart)

export default cartsRouter