import cartModel from "./models/cart.model.js";

export class CartManager {

    addCart()
    {
        return cartModel.create({products: []})
    }

    getCartProducts(cartId)
    {
        return cartModel.findById(cartId).populate('products.product')
    }

    addProductToCart(cartId, productId, quantity = 0, cart)
    {
        let oldCart = cart;
        let selectedProductIndex = oldCart.map(el => el.product).indexOf(productId);
        if(selectedProductIndex !== -1)
        {
            oldCart[selectedProductIndex].quantity += quantity
        }else
        {
            oldCart.push({product: productId, quantity: quantity})
        }
        return cartModel.findByIdAndUpdate(cartId, {products: oldCart})
    }

    removeProductFromCart(cartId, productId, cart)
    {
        let oldCart = cart;
        let selectedProductIndex = oldCart.map(el => el.product).indexOf(productId);
        if(selectedProductIndex !== -1)
        {
            oldCart.splice(selectedProductIndex, 1);
        }
        return cartModel.findByIdAndUpdate(cartId, {products: oldCart})
    }

    editCartProducts(cartId, newProducts)
    {
        return cartModel.findByIdAndUpdate(cartId, {products: newProducts})
    }

    editProductInCart(cartId, productId, quantity = 0, cart)
    {
        let oldCart = cart;
        let selectedProductIndex = oldCart.map(el => el.product).indexOf(productId);
        if(selectedProductIndex !== -1)
        {
            oldCart[selectedProductIndex].quantity = quantity
        }
        return cartModel.findByIdAndUpdate(cartId, {products: oldCart})
    }

    deleteProductsInCart(cartId)
    {
        return cartModel.findByIdAndUpdate(cartId, {products: []})
    }

}
