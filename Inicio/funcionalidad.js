let resize= window.matchMedia("(max-width: 760px)");

window.addEventListener("resize", () => {
    if (resize.matches){
        document.getElementById('grid-2').remove();
    }
});