export const generateUnknowProductError = (productId) => {
    return `
    El id del producto no corresponse a ningun producto en nuestra base de datos. 
        Id utilizado: ${productId}
    `
}

export const generateUnknowCartError = (cartId) => {
    return `
    El id del carrito no corresponse a ningun carrito en nuestra base de datos. 
        Id utilizado: ${cartId}
    `
}