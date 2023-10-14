let productStock;
let productQuantity = 0;

window.addEventListener('load', function () {
    productStock = parseInt(jQuery('#product-stock').html());
    if(productStock > 0)
    {
        jQuery('#add-button').prop('disabled', false)
    }
    jQuery('#add-button').click(() => {
        handleProductQuantity('add');
    })
    jQuery('#remove-button').click(() => {
        handleProductQuantity('remove');
    })
})

const handleProductQuantity = (option) => {
    if(option === 'add')
    {
        productQuantity ++;
        jQuery('#product-quantity').html(productQuantity);
        jQuery('#remove-button').prop('disabled', false);
        if(productQuantity >= productStock)
        {
            jQuery('#add-button').prop('disabled', true)
        }
    }else
    {
        productQuantity --;
        jQuery('#product-quantity').html(productQuantity);
        jQuery('#add-button').prop('disabled', false);
        if(productQuantity <= 0)
        {
            jQuery('#remove-button').prop('disabled', true)
        }
    }
    if(productQuantity > 0)
    {
        jQuery('#add-to-cart-button').prop('disabled', false)
    }else
    {
        jQuery('#add-to-cart-button').prop('disabled', true)
    }
}

const addToCart = async (productId, cartId) => {
    try {
        await fetch(`/api/carts/${cartId}/product/${productId}`, 
        {method: 'POST', 
        body: JSON.stringify({quantity: productQuantity}),
        headers: {"Content-Type": "application/json"}});
        Swal.fire({
            title: 'Producto agregado!',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        }).then(() => {
            window.location.reload();
        })
    } catch (error) {
        Swal.fire({
            title: 'Ocurrio un error inesperado',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }
}