const socket = io();

let addButton = document.getElementById('add-button');

addButton.onclick = (async () => {
    const { value: formValues } = await Swal.fire({
        title: 'Multiple inputs',
        html:
          '<input id="input-title" class="swal2-input" placeholder="Titulo">' +
          '<input id="input-description" class="swal2-input" placeholder="Descripcion">' +
          '<input id="input-price" class="swal2-input" placeholder="Precio">' +
          '<input id="input-code" class="swal2-input" placeholder="Codigo">' +
          '<input id="input-stock" class="swal2-input" placeholder="Stock">' +
          '<input id="input-category" class="swal2-input" placeholder="Categoria">',
        focusConfirm: false,
        preConfirm: () => {
          return{
            title: document.getElementById('input-title').value,
            description: document.getElementById('input-description').value,
            price: document.getElementById('input-price').value,
            code: document.getElementById('input-code').value,
            stock: document.getElementById('input-stock').value,
            category: document.getElementById('input-category').value
            }
        }
    })
    
    addProduct(formValues);
})

socket.on('server_add_product', (data) => {
    let html = '';
    let parsedData = JSON.parse(data);
    parsedData.forEach((el) => {
        html += `
        <div class="card" style="width: 100%;">
            <div class="card-header">
                <h2>${el.title}</h2>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${el.description}</li>
                <li class="list-group-item">Precio: <strong>${el.price}</strong></li>
                <li class="list-group-item">Stock: <strong>${el.stock}</strong></li>
                <li class="list-group-item">Categoria: <strong>${el.category}</strong></li>
            </ul>
        </div>
        `
    });

    document.getElementById('cards-container').innerHTML = html;
})

const addProduct = async (data) => {
    try {
        const res = await fetch('http://localhost:8080/api/products', 
        {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}}
        )
        const json = await res.json();
        if(json.status = 'Success')
        {
            socket.emit('client_add_product', '')
        }
    } catch (error) {
        console.log(error);
    }
}