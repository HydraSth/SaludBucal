var ElementoActual="";
//Selecciona el id del elemento
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ElementoActual= ev.target.name;
}
//Cancela acciones por defecto
function allowDrop(ev){
    ev.preventDefault();
}

//Agrega elemento al contenedor
 function drop(ev){  
    ev.preventDefault();
   
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));

    EsValido(ElementoActual, ev.target.id);
}
 
let comidas = document.getElementsByClassName("alimento");

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