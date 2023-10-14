let socket;
let username = '';
let chatInput = document.getElementById('chat-input');
let chatContainer = document.getElementById('chat-container');

window.onload = (async () => {
    socket = io();

    socket.on('server_message_sent', (data) => {
        const messages = JSON.parse(data);
        let html = '';
        messages.forEach((el) => {
            html += `
            <p><strong>${el.user}</strong>: ${el.message}</p>
            `
        })
        chatContainer.innerHTML = html;
    })
    let res = await Swal.fire({
        title: 'Enter your email',
        input: 'email',
        inputLabel: 'Your email',
        inputPlaceholder: 'Email'
    });
    username = res.value;
})

chatInput.onkeyup = ((event) => {
    if(event.key === 'Enter' && chatInput.value)
    {
        socket.emit('client_message_sent', JSON.stringify({user: username, message: chatInput.value}));
        chatInput.value = '';
    }
})