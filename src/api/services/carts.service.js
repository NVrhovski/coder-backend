import { CartManager } from "../dao/dbmanagers/managers/cartManager.js";

class CartsService {

    constructor()
    {
        this.cartManager = new CartManager()
    }

    addCart()
    {
        return this.cartManager.addCart();
    }

    getCartProducts(cartId)
    {
        return this.cartManager.getCartProducts(cartId)
    }

    addProductToCart(cartId, productId, quantity, cart)
    {
        return this.cartManager.addProductToCart(cartId, productId, quantity, cart)
    }

    removeProductFromCart(cartId, productId, cart)
    {
        return this.cartManager.removeProductFromCart(cartId, productId, cart)
    }

    editCartProducts(cartId, newProducts)
    {
        return this.cartManager.editCartProducts(cartId, newProducts)
    }

    editProductInCart(cartId, productId, quantity, cart)
    {
        return this.cartManager.editProductInCart(cartId, productId, quantity, cart)
    }

    deleteProductsInCart(cartId)
    {
        return this.cartManager.deleteProductsInCart(cartId)
    }
}

export default CartsService