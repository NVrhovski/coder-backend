export default class ProductManager {
    
    constructor()
    {
        this.db = [];
    };

    getNextId()
    {
        if(this.db.length === 0)
        {
            return 1
        }else
        {
            return this.db[this.db.length - 1].id + 1
        }
    }

    addProduct({title = '', description = '', code = '', price = 0, status = true, stock = 0, category = '', thumbnails = [], owner = 'admin'})
    {
        let newData = {
            id: this.getNextId(),
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            category,
            status,
            owner
        };
        this.db.push(newData);
        return this.db
    }

    getProducts(){
        return this.db
    };

    getProductById(productId){
        let selectedProduct = this.db.find(el => el.id === productId);
        if(selectedProduct)
        {
            return selectedProduct
        }else
        {
            return {status: 'Error', error: 'Producto no encontrado'}
        }
    }

    updateProduct({productId, title = '', description = '', price = 0, thumbnail = [], code = '', stock = 0, status = true, category = ''})
    {
        let productIndex = this.db.map(el => el.id).indexOf(productId);
        if(productIndex !== -1)
        {
            this.db[productIndex] = {
                id: productId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                status,
                category
            }
            return this.db[productIndex]
        }else 
        {
            return {status: 'Error', error: 'El producto a actualizar no existe'}
        }
    }

    deleteProduct(productId)
    {
        let productIndex = this.db.map(el => el.id).indexOf(productId);
        let selectedProduct = this.db[productIndex];
        if(productIndex !== -1)
        {
            this.db.splice(productIndex, 1);
            return selectedProduct
        }else 
        {
            return {status: 'Error', error: 'El producto a eliminar no existe'}
        }
    }
}
