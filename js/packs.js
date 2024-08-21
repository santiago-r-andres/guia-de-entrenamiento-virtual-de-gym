    const file = '../db/data.json'
    const productsContainer = document.getElementById('packs')
    const cartContainer = document.getElementById('carrito')
    const cantidadPacks = document.querySelector(".count-packs")
    const checkoutButton = document.getElementById('checkout')
    let cart = [] 


    class Pack {
        constructor(clase, precio, id) {
            // this.imagen = imagen;
            this.clase = clase;
            this.precio = precio;
            this.id = id;
            this.cantidad = 1;
            this.subtotal = 0;
        }
        obtenerTotal() {
            this.subtotal = this.precio * this.cantidad;
        } 
    }


    renderizarPacks()
    loadCarritoLS()
    actualizarCarrito()
    

// Función para realizar petición a la BD data.json
    async function realizarPeticion(datos) {
        try {
            const response = await fetch(datos);
            if (!response.ok) throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
            const products = await response.json();
            return products
        } catch (error) {
            console.error('Error en la petición del server', error);
        } finally {
            console.log('Petición completada');
        }
    }
    


// Función para renderizar packs de entrenamiento
    async function renderizarPacks() {
        const products = await realizarPeticion(file)
        products.forEach(product => {
            const contenedor = document.createElement("div")
            contenedor.className = "product"
            contenedor.innerHTML += `<h3>${product.clase}</h3>
                                    <p>$${product.precio}</p>
                                    <button id=${product.id} class="agregar-carrito">Agregar al Carrito</button>`
                                
            productsContainer.appendChild(contenedor)
                            })

        const addButtons = document.querySelectorAll(".agregar-carrito")
            addButtons.forEach(button => {
            button.addEventListener("click", agregarProducto)       
                    })
    }
    


function loadCarritoLS() {
    cart = JSON.parse(localStorage.getItem('cart')) || []
}

function agregarProducto(e) {
    if(e.target.classList.contains("agregar-carrito")) {
        const packAdded = e.target.parentElement
        leerDatosProducto(packAdded)
        Toastify({

            text: "Pack Agregado",
            
            duration: 2000
            
            }).showToast();
    }
}

function leerDatosProducto(pack) {
    let clase, precio, id
    clase = pack.querySelector("h3").textContent
    precio = Number(pack.querySelector("p").textContent.replace("$", ""))
    id = parseInt(pack.querySelector("button").getAttribute("id"))

    

    const dataPack = new Pack(clase, precio, id)
    dataPack.obtenerTotal()

    agregarAlCarrito(dataPack)
}


// Función para agregar productos al carrito
    function agregarAlCarrito(addPack) {
        const packEnCarrito = cart.some((p) => p.id === addPack.id)
        if (packEnCarrito) {
            const packs = cart.map((pack) => {
                if (pack.id === addPack.id) {
                    pack.cantidad++
                    pack.subtotal = pack.precio * pack.cantidad
                    return pack
                } else {
                    return pack
                }
            })
        
            cart = packs
        } else {
            cart.push(addPack)
        }
        guardarCarrito()
        actualizarCarrito()
}


// Función que actualiza el contenido del carrito
    function actualizarCarrito() {
        limpiarHTML()
        
        cart.forEach((producto) => {
            const {clase, precio, cantidad, subtotal, id} = producto;

            const div = document.createElement("div")
                div.classList.add("cart-item")
                div.innerHTML = `
                     <h3>${clase}</h3>
                     <P>Precio: $${precio}</P>
                     <P>Cantidad: ${cantidad}</P>
                    <P>Subtotal: $${subtotal}</P>
                    <button id=${id} class="remove-btn"> X </button>
        `
        cartContainer.appendChild(div)
    })

    const removeButtons = document.querySelectorAll(".remove-btn")
    removeButtons.forEach(button => {
    button.addEventListener("click", eliminarDelCarrito)
})
mostrarCantidadProductos()
mostrarTotal()
    }

// Función para limpiar el HTML
function limpiarHTML() {
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild)
    }
}

// Función para mostrar la cantidad de productos

function mostrarCantidadProductos() {
    let contarProductos

    if (cart.length > 0) {
        contarProductos = cart.reduce((cantidad, producto) => cantidad + producto.cantidad, 0)
        console.log(contarProductos) 
        cantidadPacks.innerText = `${contarProductos}`
    }
}


// Función que elimina productos del carrito
    function eliminarDelCarrito(e) {
        if (e.target.classList.contains("remove-btn")) {
            const productoId = parseInt(e.target.getAttribute("id"))
            cart = cart.filter(p => p.id !== productoId)
            guardarCarrito()
            console.log(cart)
            actualizarCarrito() 
        }
    }

// Función que guarda en localStorage los productos agregados al carrito
    function guardarCarrito() {
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    // Función para mostrar el total del carrito
function mostrarTotal() {
    const totalElement = document.getElementById('total');
    const total = cart.reduce((acc, producto) => acc + producto.subtotal, 0);
    totalElement.innerHTML = `Total a Pagar: $ ${total}`
}

    checkoutButton.addEventListener('click', () => {
        Swal.fire({
            title: "Compra Existosa!",
            text: "Gracias por elegirnos!",
            icon: "success"
          });
        cart = []
        guardarCarrito()
        actualizarCarrito()
    });