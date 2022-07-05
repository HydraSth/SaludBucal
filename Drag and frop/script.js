
//Selecciona el id del elemento
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
//Cancela acciones por defecto
function allowDrop(ev){
    ev.preventDefault();
}

//Agrega elemento al contenedor
 function drop(ev){  
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
 }