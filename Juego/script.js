var ElementoActual="";
var IdContenedor="";
var i=0;

//Selecciona el id del elemento
function drag(ev) {
    ElementoActual= ev.target.name;
    i=0;
}
//Cancela acciones por defecto
function allowDrop(ev){
    ev.preventDefault();
}

//Agrega elemento al contenedor
function drop(ev){  
    ev.preventDefault();
    IdContenedor = ev.target.id;
    if(i<1){
        EsValido(ElementoActual, IdContenedor);
    }
    i++;
}

var boton_cerrar= document.getElementById("cerrar");

//Chequea validez
function EsValido(elementoId,target){
    console.log(elementoId);
    console.log(target);
    if(elementoId == target){
       alert("Es correcto");
    }else{
        AbrirModal();
    }
}

//Ventana modal

//Abrir modal
function AbrirModal(){
    Animacion();
    document.getElementById("Modal").style.opacity = "100";
    document.getElementById("Modal").style.zIndex= "2";
}

//Perder
