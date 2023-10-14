window.addEventListener('load', function () {
    jQuery('#password-input').change(() => {
        if(jQuery('#password-input').val() != '')
        {
            jQuery('#check-password').prop('disabled', false)
        }else
        {
            jQuery('#check-password').prop('disabled', true)
        }
    })
})

const checkPassword = async () => {
    const payload = {
        email: jQuery('#user-email').html(),
        password: jQuery('#password-input').val()
    }   
    try {
        const response =  await fetch('/api/session/check-password',
        {method: 'POST', 
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(payload) 
        }
         )
         if(response.status === 200)
         {
            jQuery('#change-button').prop('disabled', false);
            jQuery('#check-text').css('display', 'inline');
            jQuery('#check-text').css('color', 'green');
            jQuery('#check-text').html('Valid password')
         }else
         {
            jQuery('#change-button').prop('disabled', true);
            jQuery('#check-text').css('display', 'inline');
            jQuery('#check-text').css('color', 'red');
            jQuery('#check-text').html('You cant use the same password')
         }
     } catch (error) {
         console.log(error);
     }
}

const resetPassword = async () => {
    const payload = {
        email: jQuery('#user-email').html(),
        password: jQuery('#password-input').val()
    }
    try {
        const response =  await fetch('/api/session/change-password',
        {method: 'POST', 
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(payload) 
        }
         )
         if(response.status === 200)
         {
            Swal.fire({
                title: 'Password changed',
                icon: 'success',
                confirmButtonText: 'Close'
            }).then(() => {
                window.location.href = '/login';
            })
         }else
         {
            Swal.fire({
                title: 'Error recovering password!',
                text: 'Try later',
                icon: 'Error',
                confirmButtonText: 'Close'
            })
         }
     } catch (error) {
         console.log(error);
     }
}