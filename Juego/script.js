var ElementoActual="";
var IdContenedor="";
var IdSeleccion="";
var i=0;

//Selecciona el id del elemento
function drag(ev) {
    ElementoActual= ev.target.name;
    IdSeleccion= ev.target.id;
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
    if(elementoId == target){
       AbrirModalG();
    }else{
        AbrirModal();
    }
}

//Ventana modal

var musicPerder = new Audio('Sonido/Perder.mp3');
var musicGanar = new Audio('Sonido/Ganar.mp3');

//Abrir modal
function AbrirModal(){
    musicPerder.play();
    document.getElementById("Modal").style.opacity = "100";
    document.getElementById("Modal").style.zIndex= "2";
}

function AbrirModalG(){
    musicGanar.play();
    document.getElementById("Modal-G").style.opacity = "100";
    document.getElementById("Modal-G").style.zIndex= "2";
    setTimeout(() => {
        document.getElementById("Modal-G").style.opacity = "0";
        document.getElementById("Modal-G").style.zIndex= "-1";
    }, 1000);
    document.getElementById(IdSeleccion).remove();
}
//Perder
