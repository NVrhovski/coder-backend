import { ProductManager } from "../dao/dbmanagers/managers/productManager.js"

class ProductsService {
    
    constructor(){
        this.productManager = new ProductManager();
    }

    getAll(query)
    {
        return this.productManager.getProducts(query)
    }

    getProductById(productId)
    {
        return this.productManager.getProductById(productId)
    }

    addProduct(productData)
    {
        return this.productManager.addProduct(productData)
    }

    updateProduct(productData)
    {
        return this.productManager.updateProduct(productData)
    }

    deleteProduct(productId)
    {
        return this.productManager.deleteProduct(productId)
    }
}

export default ProductsService