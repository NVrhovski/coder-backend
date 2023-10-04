const generateTicket = async () => {
    try {
       const response =  await fetch('/api/carts/purchase',
        {method: 'POST'}
        )
        if(response.status === 200)
        {
            Swal.fire({
                title: 'Ticket generado!',
                text: 'El ticket fue enviado a tu email',
                icon: 'success',
                confirmButtonText: 'Cerrar'
              });
        }else
        {
            Swal.fire({
                title: 'Error generando ticket!',
                text: 'Intentalo nuevamente mas tarde',
                icon: 'Error',
                confirmButtonText: 'Cerrar'
              })
        }
    } catch (error) {
        console.log(error);
    }
}