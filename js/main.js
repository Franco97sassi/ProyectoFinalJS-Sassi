// Creo array de comidas
const productos =
[
    { id: 1, nombre: "pizza", precio: 2500, cantidad: 1, img: "./img/pizza.jpg" },
    { id: 2, nombre: "empanada", precio: 250, cantidad: 1, img: "./img/empanada.jpg" },
    { id: 3, nombre: "panino", precio: 2000, cantidad: 1, img: "./img/panino.jpg" },
    { id: 4, nombre: "carlitos", precio: 1500, cantidad: 1, img: "./img/carlitos.jpg" },
    { id: 5, nombre: "ravioles", precio: 1000, cantidad: 1, img: "./img/ravioles.jpg" },
   
]
 
//Accedo al Dom
const abrirCarrito = document.querySelector('#cesta-carrito');
const modalContenedor = document.querySelector('.modal-contenedor');
const modalCarrito = document.querySelector('.modal-carrito')
const cerrarCarrito = document.querySelector('#btn-cerrar-carrito');
const vaciarCarrito = document.querySelector('.vaciar-carrito');
const comprarCarrito = document.querySelector('.comprar-carrito');

//Creo los distintos eventos para cuando abro y me posiciono el carrito
abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

modalContenedor.addEventListener('click', () => {
    cerrarCarrito.click()
});

//Eventos a partir de eliminar productos del carrito usando Sweet Alert y promesas(con metodo then y catch)
modalCarrito.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('boton-eliminar')) {
        Swal.fire({
            title: '¿Quieres quitar este Producto?',
             icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            background:'#A0A0A0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Quitar',
            cancelButtonText: 'Cancelar',
         }).then((result) => {
            if (result.isConfirmed) {
                eliminarProductoCarrito(e.target.value);
                Swal.fire({
                   title: 'Eliminado',
                    icon:'success',
                })
            }
        })
    }
});

vaciarCarrito.addEventListener("click", (e) => {
    e.stopPropagation();
    const existeElemento = document.getElementById("contador-carrito");
    if (e.target.classList.contains('vaciar-carrito')) {
        if (existeElemento.innerText > 0) {
        Swal.fire({
            title: '¿Quiere vaciar el carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            background:'#A0A0A0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vaciar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                vaciarTodoElCarrito();
                Swal.fire({
                    title: 'Carrito Vaciado',
                    icon:'success',
            })
            }
        })
    }
    else {
        Swal.fire({
            title: 'Vacío',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Volver',
    }
)}}});

comprarCarrito.addEventListener("click", (e) => {
    e.stopPropagation();
    const existeElemento = document.getElementById("contador-carrito");
    if (e.target.classList.contains('comprar-carrito')) {
        if (existeElemento.innerText > 0) {
        Swal.fire({
            title: '¿Quiere abonar tu compra ?',
             
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            background:'#A0A0A0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Pagar',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.isConfirmed) {
                finalizarElCarrito();
                Swal.fire({
                    title: 'Gracias por comprar,vuelva pronto',
                    icon:'success',
            })
            }
        })
    }
    else {
        Swal.fire({
            title: 'Vacío',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Volver',
    }
)}}});

//Uso del LocalStorage
const guardarCarritoStorage = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    return carritoStorage;
}

 //InnerHtml dentro del carrito
const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((ac, i) => ac + i.cantidad, 0);
    const subtotalCompra = carrito.reduce((ac, i) => ac + (i.precio * i.cantidad), 0);
    const ivaCompra = carrito.reduce((ac, i) => ac + ((i.precio * i.cantidad) * 0.21), 0);
    const totalCompra = subtotalCompra + ivaCompra ;

    pintarTotalesCarrito(totalCantidad, subtotalCompra, ivaCompra,   totalCompra);
    guardarCarritoStorage(carrito);
};

const pintarTotalesCarrito = (totalCantidad, subtotalCompra, ivaCompra,  totalCompra) => {
  const contadorCarrito = document.getElementById("contador-carrito");
  const precioSubtotal = document.getElementById("precioSubtotal");
  const precioIVA = document.getElementById("precioIVA");
  const precioTotal = document.getElementById("precioTotal");
 
  
  contadorCarrito.innerText = totalCantidad;
  precioSubtotal.innerText = subtotalCompra;
  precioIVA.innerText = ivaCompra;
  precioTotal.innerHTML = totalCompra;
 };
 
let carrito = [];

const validarProductoRepetido = (productoId) => {

    if (localStorage.getItem("carrito")) {
        carrito = obtenerCarritoStorage();
    };

    const productoRepetido = carrito.find( producto => producto.id === productoId);

    if (productoRepetido) {
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`;
        actualizarTotalesCarrito(carrito);
        Toastify({
            text: `Agregaste otro/a ${productoRepetido.nombre}`,
            duration: 1000
        }).showToast();
    } else {
        agregarAlCarrito(productoId);
    }
};

const agregarAlCarrito = (productoId) => {
    const contenedor = document.getElementById("carrito-contenedor");
    const producto = productos.find( producto => producto.id === productoId );
    carrito.push(producto);

    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
                    `
    contenedor.appendChild(div);
    actualizarTotalesCarrito(carrito);
    Toastify({
        text: `Agregaste un/una ${producto.nombre} al carrito`,
        duration: 1000
    }).showToast();
};

//funcion de crear el html dentro del carrito
const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById("carrito-contenedor");

    contenedor.innerHTML = "";

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productoEnCarrito");
        div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
                    `
        contenedor.appendChild(div);
    });
};

//funciones para eliminar productos del carrito
const eliminarProductoCarrito = (productoId) => {
    const carritoStorage = obtenerCarritoStorage();
    const carritoActualizado = carritoStorage.filter( producto => producto.id != productoId);

    actualizarTotalesCarrito(carritoActualizado);
    pintarCarrito(carritoActualizado);
};

const vaciarTodoElCarrito = (aVaciar) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito"))
    for (let i = carritoActual.length; i> 0; i--) {
        carritoActual.pop(i)
    }
    guardarCarritoStorage(carritoActual);
    pintarCarrito(carritoActual);
    actualizarTotalesCarrito(carritoActual);
}
const finalizarElCarrito = (aFinalizar) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito"))
    for (let i = carritoActual.length; i> 0; i--) {
        carritoActual.pop(i)
    }
    guardarCarritoStorage(carritoActual);
    pintarCarrito(carritoActual);
    actualizarTotalesCarrito(carritoActual);
}
 
const mostrarProductos = (productos) => {
  const contenedorProductos = document.getElementById("producto-contenedor");

  contenedorProductos.innerHTML= "";

  productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML += `<div class="card-image">
                        <img src=${producto.img}>
                        <span class="card-title">${producto.nombre}</span>
                        <button class="boton-agregar" id=boton${producto.id}>Agregar </button>
                      </div>
                      <div class="card-content">
                          
                          <p>Precio:$ ${producto.precio}</p>
                      </div>
                     `
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      validarProductoRepetido(producto.id);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productos);

    if (localStorage.getItem("carrito")) {
        const carrito = obtenerCarritoStorage();
        pintarCarrito(carrito);
        actualizarTotalesCarrito(carrito);
    };
});
 
//Funcion para filtrar productos
function filtrar(filtro) {
    let filtrado = productos.filter((el) => {
      return el.nombre.includes(filtro);
    })
    return filtrado;
  }
   
const search = document.querySelector("#search");

search.addEventListener("input", () => {
    let filtro = filtrar(search.value)
    mostrarProductos(filtro)
  })

  //Uso de fetch 
  fetch('./data/data.json')
.then((response) => response.json())
.then((data) => {
  mostrarProductos(data);
 });

 
 