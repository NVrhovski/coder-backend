const generateTicket = async () => {
    try {
        await fetch('/api/carts/purchase',
        {method: 'POST'}
        )
        Swal.fire({
            title: 'Ticket generado!',
            text: 'El ticket fue enviado a tu email',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          })
    } catch (error) {
        console.log(error);
    }
}