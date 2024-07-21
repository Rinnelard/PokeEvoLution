const btnInstrucciones = document.getElementById("btnInstrucciones");
const imagenInstrucciones = document.getElementById("imagenInstrucciones");
const imgBtnInstruccion = document.getElementById("imgInstrucciones");

/* Mostrar la pantalla de instrucciones */
btnInstrucciones.addEventListener("click", () => {
    if (
        imagenInstrucciones.style.display === "none" ||
        imagenInstrucciones.style.display === ""
    ) {
        imgBtnInstruccion.style.display = "block";
        imagenInstrucciones.style.display = "block";
    } else {
        imagenInstrucciones.style.display = "none";
        imgBtnInstruccion.style.display = "none";
    }
});
