var ElementoActual="";
var IdContenedor="";
var claseContenedor="";
var IdSeleccion="";
var i=0;

const presentacion= document.getElementById("explicacion");
const juego= document.getElementById("container");
juego.remove();
 setTimeout(() => {
    SaltarIntro();
}, 7200);

function SaltarIntro(){
    presentacion.remove();
    const header = document.getElementById("header");
    header.style.height = "0";
    header.classList.add("hidden");
    document.body.classList.add("header-hidden");
    document.body.appendChild(juego);    
}

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
    
    // Obtener el ID del contenedor correcto
    let target = ev.target;
    while (target && !target.id) {
        target = target.parentElement;
    }
    
    IdContenedor = target ? target.id : '';
    claseContenedor = ev.target.className;
    
    if(i<1){
        EsValido(ElementoActual, IdContenedor, claseContenedor);
    }
    i++;
}

var boton_cerrar= document.getElementById("cerrar");

//Chequea validez
function EsValido(elementoId, target, claseDestino){
    console.log('Validando:', elementoId, 'vs', target, 'clase:', claseDestino);
    
    // Solo validar si se soltó en una zona de clasificación válida
    if(target === 'Sano' || target === 'Insano'){
        if(elementoId === target){
            // Respuesta correcta
            AbrirModalG();
        } else {
            // Respuesta incorrecta
            AbrirModal();
        }
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
