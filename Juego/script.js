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

//Chequea validez
function EsValido(elementoId,target){
    console.log(elementoId);
    console.log(target);
    if(elementoId == target){
       alert("Es correcto");
    }else{
       alert("Es incorrecto");
    }
}