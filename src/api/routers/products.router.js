import { Router } from "express"
import { addProduct, deleteProduct, getAll, getProductById, updateProduct } from "../controllers/products.controller.js";
import passport from "passport";
import { adminMiddleware } from "../../middleware/auth.middleware.js";

const productsRouter = Router();

productsRouter.get('/', getAll)

productsRouter.get('/:id', getProductById)

productsRouter.post('/', passport.authenticate('current'), adminMiddleware, addProduct)

productsRouter.put('/:id', passport.authenticate('current'), adminMiddleware, updateProduct)

productsRouter.delete('/:id', passport.authenticate('current'), adminMiddleware, deleteProduct)

export default productsRouter