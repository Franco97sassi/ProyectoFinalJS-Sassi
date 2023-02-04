 
let id = document.querySelector("#id"),
nombre = document.querySelector("#nombre"),
precio = document.querySelector("#precio"),
imagen = document.querySelector("#imagen"),
busqueda = document.querySelector("#busqueda"),
tabla = document.querySelector("#tabla"),
formulario = document.querySelector("#formulario");
const radios = document.querySelectorAll('input[type="radio"]')

const inventario = [
  { id: 1, nombre: "pizza", precio: 2500, img:  "pizza.jpg" },
  { id: 2, nombre: "empanada", precio: 280, img: "empanada.jpg" },
  { id: 3, nombre: "panino", precio: 1900, img: "panino.jpg" },
  { id: 4, nombre: "carlitos", precio: 1790, img: "carlitos.jpg" },
  { id: 5, nombre: "ravioles", precio: 950, img: "ravioles.jpg" },
]

let comidas;
if (localStorage.getItem("inventario")) {
  comidas = JSON.parse(localStorage.getItem("inventario"))
} else {
  comidas = inventario
}

function comida(id, nombre, precio, img) {
  this.id = id;
  this.nombre = nombre;
  this.precio = parseFloat(precio);
  if (img="") {
    this.img = "noimagen.jpg"
  } else {
    this.img = img;
  }
}

function cargar(array, comida) {
  array.push(comida)
}
function guardar(array) {
  localStorage.setItem("array", JSON.stringify(array))
}
function filtrar(array, filtro, par) {
  return array.filter((el) => {
    if (par == "precio") {
      return el.precio <= parseFloat(filtro)
    } else {
      return el[`${par}`].includes(filtro)
    }
  })
}

function estruct(array) {
  tabla.innerHTML = "";
  let html = "";
  for (const i of array) {
    html = `<tr>
        <td>${i.id}</td>
        <td>${i.nombre}</td>
        <td>${i.precio}</td>
        <td><img src="${i.img}"/></td>
        <td><button class="btn red" id="${i.isbn}">Borrar</button></td>
        </tr> `

  }
  tbody.innerHTML += html
}

const botones = querySelectorAll()
botones.forEach((boton) => {
  boton.addEventListener("click", ("td .btn") => {
    comidas = comidas.filter((el) => el.isbn != boton.id);
    console.log(comidas);
    cargar(comidas)
    estruct(comidas)
  })
})

  estruct(comidas)
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevaComida = new comida(
    id.value,
    nombre.value,
    precio.value,
    imagen.value
  )
  console.log(nuevaComida);
  cargar(comidas, nuevaComida)
  guardar(comidas)
  estruct(comidas)
  formulario.reset()
});

buscar.addEventListener("input", () => {
  let otroFiltro = filtrar(comidas, buscar.value, "nombre")
  estruct(otroFiltro)
}
)

for (const r of radios) {
  r.addEventListener("change", () => {
    if (radios, checked) {
      buscar.addEventListener("input", () => {
        let otroFiltro = filtrar(comidas, buscar.value, r.value)
        estruct(otroFiltro)
      })
    }
  })

}
