let BotonGirar= document.getElementById('Girar');
let Dado= document.getElementById('Dado');
let Contador= 0; //Contador de dientes pintados
let Max=6;  //Numero maximo del dado
let NumeroDelDado=0; //Numero generado por el dado
let Dientes= document.querySelectorAll(".Desactivado"); // Array con todos los dientes
let YaPinto=1;
let NumeroConstelacion=document.getElementById('NumeroConstelacion');    
let ContadorDeClicks=0;

function NumRandom(){
    NumeroDelDado= Math.floor((Math.random() * (Max+1 -1)) +1);
    Contador = Contador+NumeroDelDado;
    if(Contador>=26 && Max>0){
        Max=Max-NumeroDelDado;
    }else if(Contador==33){
        alert('Finalizo');
    }
    Dientes.forEach(Dientes => Dientes.classList.remove("Desactivado"));
    YaPinto=0;
    ContadorDeClicks=0;
    HacerConstelacion();
    return NumeroDelDado;
}

function AnimacionGirar(){
    BotonGirar.setAttribute( "onclick","");
    BotonGirar.style.cursor="not-allowed";
    document.getElementById('NumeroAleatorio').innerHTML = '?';
    Dado.classList.add("animar");
    setTimeout(() => {
        Dado.classList.remove("animar");
        document.getElementById('NumeroAleatorio').innerHTML = NumRandom();
    }, 3000);
}

let DientesSucios= [];
let ContadorCirculosRellenos=0;
let TConstelacionCirculos= document.getElementsByTagName("circle");

function CambiarImagen(Identifier) {
    if(!DientesSucios.includes(Identifier)){
        ContadorDeClicks++;
        DientesSucios.push(Identifier);
        if(YaPinto==0 && ContadorDeClicks<=NumeroDelDado){
            document.getElementById(`${Identifier}`).src= `DB/${Identifier}1.png`;  
            document.getElementById(`${Identifier}`).style.opacity=1;    
            TConstelacionCirculos[ContadorCirculosRellenos].style.fill='#ffff';
            ContadorCirculosRellenos++;
            if(ContadorDeClicks==NumeroDelDado){
                Dientes.forEach(Dientes => Dientes.classList.add("Desactivado"));
                ContadorDeClicks=0;
                YaPinto=1;
                ContadorCirculosRellenos=0;
                BotonGirar.setAttribute( "onclick","AnimacionGirar()");
                BotonGirar.style.cursor="pointer";
            } 
        }
    }
}

function HacerConstelacion(){
    NumeroConstelacion.innerHTML="";
    for (let contador = 0; contador < NumeroDelDado; contador++) {
        NumeroConstelacion.innerHTML += `<svg class="CirculosConstelacion" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="4" fill="#ff3838"></circle></svg>`;
    }
}
TConstelacionCirculos= document.getElementsByTagName("circle");

//Comando para completar de mugre todos los dientes Dientes.forEach(elemento => elemento.src= `DB/${elemento.id}1.png`)
// Por cada iteracion a la llamada de cambiar imagen es que toco una imagen, entonces para poder verficar
// hay que hacer un contador externo a la funcion CambiarImagen y cuando supere el numero del dado hay que
// añadir la clase desactivado