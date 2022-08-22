// Selectores de html
let ArchivoJs = document.getElementById('SrcScript');
let BotonGirar= document.getElementById('Girar');
let Dado= document.getElementById('Dado');
let Dientes= document.querySelectorAll(".Desactivado"); // Array con todos los dientes
let NumeroConstelacion=document.getElementById('NumeroConstelacion');    

// Todos elementos inamobibles
Dientes.forEach(elemento => elemento.setAttribute( "draggable","false"));

let Contador= 0; //Contador de dientes pintados
let Max=6;  //Numero maximo del dado
let NumeroDelDado=0; //Numero generado por el dado
let YaPinto=false; //Segunda comprobacion para no cambiar imagen del diente
let ContadorDeClicks=0; //Contador para comprobar que la cantidad de clicks en los dientes sea valida

//La funcion es llamada al pulsar el boton girar
function AnimacionGirar(){
    BotonGirar.setAttribute( "onclick",""); //Elimina la posibilidad de volverlo a girar hasta que se pinten todos los dientes
    BotonGirar.style.cursor="not-allowed"; //Simbolo grafico de que no se puede girar
    document.getElementById('NumeroAleatorio').innerHTML = '?'; //Remplaza cualquier numero por una interrogacion en el dado
    Dado.classList.add("animar"); //Animacion de girar
    setTimeout(() => {
        Dado.classList.remove("animar"); //Finaliza animacion
        document.getElementById('NumeroAleatorio').innerHTML = NumRandom(); //Se genera un numero aleatorio en el dado
    }, 3000);
}

//Habilita cambio en los dientes de la boca
function HabilitarEdicionDeDientes(){
    Dientes.forEach(Dientes => Dientes.classList.remove("Desactivado")); //Simbolo grafico de edicion habilitada
    YaPinto=true; //Bool que permite el cambio
}

//Funcion que devuelve un numero random valido para el dado
function NumRandom(){
    NumeroDelDado= Math.floor((Math.random() * (Max+1 -1)) +1); //Genera numero aleatorio en el dado
    Contador = Contador+NumeroDelDado; //Lleva la cuenta de todos los dientes pintados
    if(Contador>=26 && Max>0){ //Cuando quedan 6 para el final va reduciendo el numero que puede aparecer en el dado
        Max=Max-NumeroDelDado;
    }
    if(Contador>=33){ //"Pinto todos los dientes"
        //console.log("CambioElJs")
        ArchivoJs.setAttribute("src","../DientesLimpiosMini.js")
    }
    HabilitarEdicionDeDientes();
    ContadorDeClicks=0;
    HacerConstelacion();
    return NumeroDelDado;
}

let ContadorCirculosRellenos=0; //Variable que permite llevar la cuenta de los circulos pintados
let TConstelacionCirculos= document.getElementsByTagName("circle"); //Selecciona todos los circulos debajo de girar

//Funcion que crea los circulos debajo del boton girar
function HacerConstelacion(){
    NumeroConstelacion.innerHTML=""; //Borra todos los circulos
    for (let contador = 0; contador < NumeroDelDado; contador++) { //Genera tantos circulos como el numero del dado
        NumeroConstelacion.innerHTML += `<svg class="CirculosConstelacion" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="4" fill="#ff3838"></circle></svg>`;
    }
}

//Una vez generados todos los circulos se actuliza la lista de circulos
TConstelacionCirculos= document.getElementsByTagName("circle");

let DientesSucios= []; //Coleccion de dientes pintados

//Funcion que cambia los dientes limpios por sucios, es llamada por cada imagen de los dientes
function CambiarImagen(Identifier) {
    if(!DientesSucios.includes(Identifier)){ //Verifica que el diente seleccionado no sea uno ya pintado, se encuentra invertido ya que al no estar en la coleccion devolveria "false" y no permitiria acceder al condicional
        ContadorDeClicks++; //Se aumenta un contador para llevar la cuenta de la cantidad de dientes pintados
        if(YaPinto && ContadorDeClicks<=NumeroDelDado){ //Se verifica que pueda pintar 
            DientesSucios.push(Identifier); //Se agrega a la colecion el nuevo diente pintado
            document.getElementById(`${Identifier}`).src= `DB/${Identifier}1.png`; //Se remplaza por diente pintado
            TConstelacionCirculos[ContadorCirculosRellenos].style.fill='#ffff'; //Se rellena un circulo de la constelacion
            ContadorCirculosRellenos++; //Aumenta el contador para pintar el siguiente circulo de la constelacion
            if(ContadorDeClicks==NumeroDelDado){ //Si el contador llego al numero indicado por el dado
                Dientes.forEach(Dientes => Dientes.classList.add("Desactivado")); //Se desactivan los dientes
                ContadorDeClicks=0; //El contador que verifica que el numero se resetea
                YaPinto=false; //Segunda comprobacion, porque se salta la verificacion de que no esta incluido en el array entonces siguen apareciendo dientes pintados 
                ContadorCirculosRellenos=0; //Se resetea el contador
                BotonGirar.setAttribute( "onclick","AnimacionGirar()"); //El boton vuelve a habilitarse para girar el dado
                BotonGirar.style.cursor="pointer"; //Simbolo visual de que es posible girarlo
            } 
        }
    }
}

//Comando para completar de mugre todos los dientes Dientes.forEach(elemento => elemento.src= `DB/${elemento.id}1.png`)
