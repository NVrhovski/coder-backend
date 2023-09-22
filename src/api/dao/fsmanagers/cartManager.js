import fs from 'fs'
import moment from 'moment';

export default class CartManager {
    
    constructor(path, ticketPath)
    {
        this.path = path;
        this.ticketPath = ticketPath;
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
            return newData;
        }else
        {
            let newData = [{
                id: this.getNextId(),
                products: []
            }];
            fs.writeFileSync(this.path, JSON.stringify(newData));
            return newData;
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
                return selectedCart
            }else
            {
                return {status: 'Error', error: 'El carrito no fue encontrado'}
            }
        }else
        {
            return {status: 'Error', error: 'El archivo no existe o fue eliminado'};
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
                return selectedCart
            }else
            {
                return {status: 'Error', error: 'El carrito no fue encontrado'}
            }
        }else
        {
            return {status: 'Error', error: 'El archivo no existe o fue eliminado'};
        }
    }

    removeProductFromCart(cartId, productId, cart)
    {
        let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        let oldCart = data.find(el => el.id === cartId);
        let selectedCartIndex = data.map(el => el.id).indexOf(cartId);
        let selectedProductIndex = oldCart.map(el => el.product._id.toString()).indexOf(productId);
        if(selectedProductIndex !== -1)
        {
            oldCart.splice(selectedProductIndex, 1);
            data[selectedCartIndex] = {_id: cartId, products: oldCart}
            fs.writeFileSync(this.path, JSON.stringify(data));
        }
        return data[selectedCartIndex]
    }

    editCartProducts(cartId, newProducts)
    {
        let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        let selectedCart = data.find(el => el.id === cartId);
        let selectedCartIndex = data.map(el => el.id).indexOf(cartId);
        selectedCart.products = newProducts;
        data[selectedCartIndex] = selectedCart;
        fs.writeFileSync(this.path, JSON.stringify(data));
        return data[selectedCartIndex]
    }

    editProductInCart(cartId, productId, quantity = 0, cart)
    {
        let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        let selectedCart = data.find(el => el.id === cartId);
        let selectedCartIndex = data.map(el => el.id).indexOf(cartId);
        let selectedProductIndex = selectedCart.map(el => el.product._id.toString()).indexOf(productId);
        if(selectedProductIndex !== -1)
        {
            selectedCart[selectedProductIndex].quantity = quantity;
            data[selectedCartIndex] = selectedCart;
            fs.writeFileSync(this.path, JSON.stringify(data));
        }
        return selectedCart
    }

    deleteProductsInCart(cartId)
    {
        let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        let selectedCart = data.find(el => el.id === cartId);
        let selectedCartIndex = data.map(el => el.id).indexOf(cartId);
        selectedCart.products = [];
        data[selectedCartIndex] = selectedCart;
        fs.writeFileSync(this.path, JSON.stringify(data));
        return selectedCart
    }

    payCart(amount, purchaser, code)
    {
        if(fs.existsSync(this.ticketPath))
        {
            let data = JSON.parse(fs.readFileSync(this.ticketPath, 'utf-8'));
            let newData = {
                code,
                amount,
                purchaser,
                purchase_datetime: moment().format()
            };
            data.push(newData);
            fs.writeFileSync(this.ticketPath, JSON.stringify(data));
            return newData
        }else
        {
            let newData = [{
                code,
                amount,
                purchaser,
                purchase_datetime: moment().format()
            }];
            fs.writeFileSync(this.ticketPath, JSON.stringify(newData));
            return newData
        }
    }

}
