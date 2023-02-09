const search = document.querySelector("#search"),
  contenedor = document.querySelector("#contenedor")

//arreglo de comidas
const comidas = [
  { id: 1, nombre: "pizza", precio: 2500, img: "pizza.jpg" },
  { id: 2, nombre: "empanada", precio: 280, img: "empanada.jpg" },
  { id: 3, nombre: "panino", precio: 1900, img: "panino.jpg" },
  { id: 4, nombre: "carlitos", precio: 1790, img: "carlitos.jpg" },
  { id: 5, nombre: "ravioles", precio: 950, img: "ravioles.jpg" },
]


function comida(id, nombre, precio, img) {
  this.id = id;
  this.nombre = nombre;
  this.precio = parseFloat(precio);
  if (img = "") {
    this.img = "noimagen.jpg"
  } else {
    this.img = img;
  }
}
 
function filtrar(filtro) {
  let filtrado = comidas.filter((el) => {
    return el.nombre.includes(filtro);
  })
  return filtrado;
}
 
function crearHTML(array) {
  let html;
  contenedor.innerHTML = "";
  for (const comida of array) {
    html = ` <tr><td>${comida.id}</td>
           
         <td>${comida.nombre}</td>
         <td>  ${comida.precio}   </td>    
         <td>
         <img src="../img/${comida.img}"/> </img></td>
         <td><button   id="${comida.id}">Comprar</button></td> </tr>`
    contenedor.innerHTML += html;
  }

}

crearHTML(comidas)

search.addEventListener("input", () => {
  let filtro = filtrar(search.value)
  crearHTML(filtro)
})



 






