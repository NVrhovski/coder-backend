import { Router } from "express"
import { ProductManager } from "../../managers/productManager.js";

const productsRouter = Router();

const productManager = new ProductManager('src/data/products.json');

productsRouter.get('/', (req, res) => {
    let result = productManager.getProducts();
    if(!result.status)
    {
        if(req.query.limit && parseInt(req.query.limit) < result.length && parseInt(req.query.limit) >= 0)
        {
            result.length = parseInt(req.query.limit)
            return res.status(200).json(result)
        }else
        {
            return res.status(200).json(result)
        }
    }else
    {
        return res.status(400).json(result)
    }
})

productsRouter.get('/:id', (req, res) => {
    let item = productManager.getProductById(parseInt(req.params.id));
    if(item)
    {
        return res.status(200).json(item)
    }else
    {
        return res.status(400).json({status: 'Error', message: 'Producto no encontrado'})
    }
})

productsRouter.post('/', (req, res) => {
    const message = productManager.addProduct({...req.body})
    return res.status(200).json({status: 'Success', message: message})  
})

productsRouter.put('/:id', (req, res) => {
    let result = productManager.updateProduct({productId: parseInt(req.params.id), ...req.body})
    if(result.status == 'Success')
    {
        return res.status(200).json(result)
    }else
    {
        return res.status(400).json(result)
    }
})

productsRouter.delete('/:id', (req, res) => {
    let result = productManager.deleteProduct(parseInt(req.params.id));
    if(result.status == 'Success')
    {
        return res.status(200).json(result)
    }else
    {
        return res.status(400).json(result)
    }
})

export default productsRouter