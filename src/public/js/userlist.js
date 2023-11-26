handleRoleChange = async (id) => {
    try {
        const response =  await fetch(`/api/users/premium/${id}`,
            {
                method: 'POST', 
                headers: {"Content-Type": "application/json"}
            }
        )
        if(response.status === 200)
        {
            Swal.fire({
                title: 'Rol cambiado!',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            }).then(() => {
                window.location.reload()
            })
        }else
        {
            const responseBody = await response.json()
            Swal.fire({
                title: 'Ocurrio un error inesperado',
                text: responseBody.error,
                icon: 'error',
                confirmButtonText: 'Cerrar'
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Ocurrio un error inesperado',
            text: error.error,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }
}

handleUserDelete = async (id) => {
    try {
        const response =  await fetch(`/api/users/${id}`,
            {
                method: 'DELETE', 
                headers: {"Content-Type": "application/json"}
            }
        )
        if(response.status === 200)
        {
            Swal.fire({
                title: 'Usuario eliminado!',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            }).then(() => {
                window.location.reload()
            })
        }else
        {
            const responseBody = await response.json()
            Swal.fire({
                title: 'Ocurrio un error inesperado',
                text: responseBody.error,
                icon: 'error',
                confirmButtonText: 'Cerrar'
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Ocurrio un error inesperado',
            text: error.error,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }
}