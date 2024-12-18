// Función para obtener la cesta desde el localStorage
function obtenerCesta() {
    const cesta = JSON.parse(localStorage.getItem('cesta'));
    return cesta ? cesta : {};  // Devuelve la cesta o un objeto vacío si no hay datos
}

// Función para guardar la cesta en el localStorage
function guardarCesta(cesta) {
    localStorage.setItem('cesta', JSON.stringify(cesta));
}

// Función para añadir un producto a la cesta
// Función para añadir productos a la cesta
function añadirACesta(nombreProducto, precioProducto) {
    // Comprueba si el carrito ya existe en la sesión, si no, lo crea
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Obtén la cantidad seleccionada para el producto específico
    const selectElement = document.getElementById(`cantidad${nombreProducto}`);
    const cantidad = selectElement ? parseInt(selectElement.value) : 1;

    // Crea el objeto producto con el nombre, precio y cantidad
    const producto = {
        nombre: nombreProducto,
        precio: precioProducto,
        cantidad: cantidad
    };

    // Añade el producto al carrito
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    console.log(`Producto añadido: ${nombreProducto}, Precio: ${precioProducto}, Cantidad: ${cantidad}`);
}


// Función para eliminar un producto de la cesta
function eliminarDeCesta(nombreProducto) {
    const cesta = obtenerCesta();  // Obtener la cesta actual
    delete cesta[nombreProducto];  // Eliminar el producto
    guardarCesta(cesta);  // Guardar la cesta actualizada
    mostrarCesta();  // Mostrar la cesta actualizada
}

// Función para mostrar la cesta
function mostrarCesta() {
    const cesta = obtenerCesta();  // Obtener la cesta actual
    const listaCesta = document.getElementById('listaCesta');
    const precioTotal = document.getElementById('precioTotal');
    const numeroProductos = document.getElementById('numeroProductos');

    listaCesta.innerHTML = '';  // Limpiar la cesta
    let total = 0;
    let cantidadTotal = 0;

    // Si no hay productos en la cesta
    if (Object.keys(cesta).length === 0) {
        listaCesta.innerHTML = '<p>No hay productos en la cesta.</p>';
    } else {
        for (const [productoID, { nombre, cantidad, precio }] of Object.entries(cesta)) {
            const item = document.createElement('div');
            item.classList.add('producto-item');
            
            item.innerHTML = `
                <span class="producto-id">${productoID}</span>
                <span class="producto-cantidad">${cantidad}</span>
                <span class="producto-precio">${(cantidad * precio).toFixed(2)} €</span>
                <button class="btn-eliminar" onclick="eliminarDeCesta('${productoID}')">Eliminar</button>
            `;
            listaCesta.appendChild(item);

            total += cantidad * precio;  // Calcular el total
            cantidadTotal += cantidad;  // Calcular el número total de productos
        }
    }

    // Mostrar los totales
    precioTotal.textContent = `${total.toFixed(2)} €`;
    numeroProductos.textContent = cantidadTotal;
}

// Mostrar la cesta al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCesta);

// Función para alternar la visibilidad de la cesta
function toggleCesta() {
    const listaCesta = document.getElementById('listaCesta');
    if (listaCesta.style.display === 'none' || listaCesta.style.display === '') {
        listaCesta.style.display = 'block';
    } else {
        listaCesta.style.display = 'none';
    }
}

// Función para añadir productos a la cesta desde la página de productos
function añadirProductoPasta(nombre, precio) {
    const cantidad = parseInt(document.getElementById('cantidadPasta1').value, 10);
    añadirACesta(nombre, precio, cantidad);
}

function añadirProductoPizza(nombre, precio) {
    const cantidad = parseInt(document.getElementById('cantidadPizza1').value, 10);
    añadirACesta(nombre, precio, cantidad);
}

function añadirProductoBebida(nombre, precio) {
    const cantidad = parseInt(document.getElementById('cantidadBebida1').value, 10);
    añadirACesta(nombre, precio, cantidad);
}
