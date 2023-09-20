export default class CartRepository {

    constructor(dao)
    {
        this.dao = dao
    }

    addCart()
    {
        return this.dao.addCart();
    }

    getCartProducts(cartId)
    {
        return this.dao.getCartProducts(cartId)
    }

    addProductToCart(cartId, productId, quantity, cart)
    {
        return this.dao.addProductToCart(cartId, productId, quantity, cart)
    }

    removeProductFromCart(cartId, productId, cart)
    {
        return this.dao.removeProductFromCart(cartId, productId, cart)
    }

    editCartProducts(cartId, newProducts)
    {
        return this.dao.editCartProducts(cartId, newProducts)
    }

    editProductInCart(cartId, productId, quantity, cart)
    {
        return this.dao.editProductInCart(cartId, productId, quantity, cart)
    }

    deleteProductsInCart(cartId)
    {
        return this.dao.deleteProductsInCart(cartId)
    }

    payCart(amount, purchaser, code)
    {
        return this.dao.payCart(amount, purchaser, code)
    }
}