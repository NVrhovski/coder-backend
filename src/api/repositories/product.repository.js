export default class ProductRepository{
    constructor(dao)
    {
        this.dao = dao; 
    }

    getAll(query)
    {
        return this.dao.getProducts(query)
    }

    getProductById(productId)
    {
        return this.dao.getProductById(productId)
    }

    addProduct(productData)
    {
        return this.dao.addProduct(productData)
    }

    updateProduct(productData)
    {
        return this.dao.updateProduct(productData)
    }

    deleteProduct(productId)
    {
        return this.dao.deleteProduct(productId)
    }
}