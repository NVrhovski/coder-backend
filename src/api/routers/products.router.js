import { Router } from "express"
import { addProduct, deleteProduct, getAll, getProductById, updateProduct } from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get('/', getAll)

productsRouter.get('/:id', getProductById)

productsRouter.post('/', addProduct)

productsRouter.put('/:id', updateProduct)

productsRouter.delete('/:id', deleteProduct)

export default productsRouter