//Entrega 1
function saludar(nombre){
    alert("hola "+nombre)
}
 alert("Bienvenido al Restaurante");
 let nomb=prompt("escribe tu nombre")
 saludar(nomb)
alert("Al ser epoca de fiestas realizamos descuetos del 21% sobre el total de tu compra!!!");
//   Entrega 2
  const comidas=[
    {id:1,nombre:"pizza",precio:2500,img:"pizza.jpg"},
    {id:2,nombre:"empanada",precio:280,img:"empanada.jpg"},
    {id:3,nombre:"panino",precio:1900,img:"panino.jpg"},
    {id:4,nombre:"carlitos",precio:1790,img:"carlitos.jpg"},
    {id:5,nombre:"ravioles",precio:950,img:"ravioles.jpg"},
  ]

  function comida(nombre,precio,img){
    this.id=comidas.length+1;
    this.nombre=nombre;
    this.precio=parseFloat(precio);
    if(!img){
        this.img="noimagen.jpg"
    }else{
        this.img=img;
    }
  }

  comidas.push(new comida("milanesa",1400,"milanesa.jpg"))
  comidas.push(new comida("hamburguesa",1500))
  console.log(comidas);


  function  filtrarPorPrecio(array,filtro){
    return array.filter((comida)=>{
        return comida.precio<=parseFloat(filtro);
    })
}
 
function buscarPorNombre(array,busqueda){
    return encontrado=array.find((comida)=>{
    return comida.nombre.includes(busqueda)
})
 }


let precioComida=prompt("ingresa precio de la comida que desea filtrar");
const filtradoComida=filtrarPorPrecio(comidas,precioComida)
console.log(filtradoComida );

let comidaBuscada=prompt("ingresa nombre de la comida que desea buscar");
const buscarComida=buscarPorNombre(comidas,comidaBuscada)
console.log(buscarComida );

//Entrega 1
const pizza = 2500;
const empanada = 280;
const panino = 1900;
const carlitos = 1790;
const ravioles = 950;

let total=0; 

let opcion=prompt("Seleccione que comida va a comprar(elija el numero): \n1-pizza \n2-empanada \n3-panino \n4-carlitos \n5-ravioles \nESC para finalizar")

while(opcion!="ESC"){
    switch (opcion) {
        case "1":
            total=total+pizza;
            break;
        case "2":
            total=total+empanada;
            break;
        case "3":
            total=total+panino;    
            break;
        case "4":
            total=total+carlitos;          
            break;
        case "5":
            total=total+ravioles;           
            break;   
        default:
            alert("opcion no valida")
            break;
    }
    opcion=prompt("Seleccione que comida va a comprar: \n1-pizza \n2-empanada \n3-panino \n4-carlitos \n5-ravioles \nESC para finalizar");
}
 
const Descuento=(precio)=>(precio-(precio*0.21));
 if (total!=0){
    alert("el total de la compra es "+total);
    alert("el total a pagar por usted con descuento del 21% es: "+Descuento(total))
 }else{
    alert("no ha comprado ninguna comida, hasta luego!");
 }
 
  alert("Que tengas felices fiestas!")

 

