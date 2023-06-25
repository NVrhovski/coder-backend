import fs from 'fs'

export class CartManager {
    
    constructor(path)
    {
        this.path = path;
    };

    getNextId()
    {
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            if(data.length == 0)
            {
                return 1
            }else
            {
                return data[data.length - 1].id + 1
            }
        }else 
        {
            return 1
        }
    }

    addCart()
    {
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            let newData = {
                id: this.getNextId(),
                products: []
            };
            data.push(newData);
            fs.writeFileSync(this.path, JSON.stringify(data));
            return 'Carrito agregado correctamente!';
        }else
        {
            let newData = [{
                id: this.getNextId(),
                products: []
            }];
            fs.writeFileSync(this.path, JSON.stringify(newData));
            return 'Carrito agregado correctamente!';
        }
    }

    getCartProducts(cartId)
    {
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            let selectedCart = data.find(el => el.id === cartId);
            if(selectedCart)
            {
                return selectedCart.products
            }else
            {
                return {status: 'Error', message: 'El carrito no fue encontrado'}
            }
        }else
        {
            return {status: 'Error', message: 'El archivo no existe o fue eliminado'};
        }
    }

    addProductToCart(cartId, productId, quantity = 0)
    {
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            let selectedCart = data.find(el => el.id === cartId);
            let selectedCartIndex = data.map(el => el.id).indexOf(cartId);
            if(selectedCart)
            {
                let selectedProductIndex = selectedCart.products.map(el => el.product).indexOf(productId);
                if(selectedProductIndex !== -1)
                {
                    selectedCart.products[selectedProductIndex].quantity += quantity
                }else
                {
                    selectedCart.products.push({product: productId, quantity: quantity})
                }
                data[selectedCartIndex] = selectedCart;
                fs.writeFileSync(this.path, JSON.stringify(data));
                return {status: 'Success', message: 'Producto agregado correctamente'}
            }else
            {
                return {status: 'Error', message: 'El carrito no fue encontrado'}
            }
        }else
        {
            return {status: 'Error', message: 'El archivo no existe o fue eliminado'};
        }
    }

}
