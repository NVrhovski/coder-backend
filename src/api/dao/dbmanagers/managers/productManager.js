import productModel from "../models/product.model.js";

export default class ProductManager {

    addProduct({title = '', description = '', code = '', price = 0, status = true, stock = 0, category = '', thumbnails = []})
    {
        return productModel.create({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        })
    }

    getProducts(searchParams){
        return productModel.paginate(searchParams.query ? {category: searchParams.query} : {}, {
            limit: searchParams.limit || 10,
            page: searchParams.page || 1,
            sort: searchParams.sort ? {price: searchParams.sort} : ''
        })
    };

    getProductById(productId){
        return productModel.findById(productId)
    }

    updateProduct({productId, title = '', description = '', price = 0, thumbnail = [], code = '', stock = 0, status = true, category = ''})
    {
        return productModel.findByIdAndUpdate(productId, {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        })
    }

    deleteProduct(productId)
    {
        return productModel.findByIdAndDelete(productId)
    }
}
