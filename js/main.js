
function saludar(nombre){
    alert("hola "+nombre)
}
 alert("Bienvenido al Restaurante");
 let nomb=prompt("escribe tu nombre")
 saludar(nomb)
alert("Al ser epoca de fiestas realizamos descuetos del 21% sobre el total de tu compra!!!");

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