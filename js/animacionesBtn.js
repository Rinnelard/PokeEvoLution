/* Llamando a un botón crea la animación de click a su imagen correspondiente llamando su id */
function animacionBtn(idBtn, idImg) {
    // Al hacer clic en el botón, reducimos el tamaño de la imagen
    function animarBtn(btn, idImagen) {
        // Funcionamiento en PC
        document.getElementById(btn).addEventListener("mousedown", function () {
            /* Disminuir el tamaño a la imagen seleccionada */
            function aumentarTamanyoImg(idImagen) {
                document.getElementById(idImagen).style.transform =
                    "scale(0.80)";
            }
            aumentarTamanyoImg(idImagen);
        });
        // Funcionamiento en movil
        document
            .getElementById(btn)
            .addEventListener("touchstart", function () {
                /* Disminuir el tamaño a la imagen seleccionada */
                function aumentarTamanyoImg(idImagen) {
                    document.getElementById(idImagen).style.transform =
                        "scale(0.80)";
                }
                aumentarTamanyoImg(idImagen);
            });
    }

    // Al soltar el clic, volvemos al tamaño original
    function desAnimarBtn(btn, idImagen) {
        // Funcionamiento en PC
        document.getElementById(btn).addEventListener("mouseup", function () {
            /* Volver a poner original el tamaño a la imagen seleccionada */
            function regresarTamanyoImg(idImagen) {
                document.getElementById(idImagen).style.transform = "scale(1)";
            }
            regresarTamanyoImg(idImagen);
        });
        // Funcionamiento en movil
        document.getElementById(btn).addEventListener("touchend", function () {
            /* Volver a poner original el tamaño a la imagen seleccionada */
            function regresarTamanyoImg(idImagen) {
                document.getElementById(idImagen).style.transform = "scale(1)";
            }
            regresarTamanyoImg(idImagen);
        });
    }

    animarBtn(idBtn, idImg);
    desAnimarBtn(idBtn, idImg);
}

/* Botón buscar */
animacionBtn("btnBuscar", "imgAceptar");

/* Botón borrar input */
animacionBtn("btnEliminar", "imgCancelar");

/* Botón sonido */
animacionBtn("botonAudio", "imgAudio");

/* Botón modo noche */
animacionBtn("btnModoOscuro", "imgBoton");

/* boton instrucciones */
animacionBtn("btnInstrucciones", "imgInstrucciones");

animacionBtn("acero", "acero");
animacionBtn("agua", "agua");
animacionBtn("bicho", "bicho");
animacionBtn("dragon", "dragon");
animacionBtn("electrico", "electrico");
animacionBtn("hada", "hada");
animacionBtn("fantasma", "fantasma");
animacionBtn("fuego", "fuego");
animacionBtn("hielo", "hielo");
animacionBtn("normal", "normal");
animacionBtn("planta", "planta");
animacionBtn("lucha", "lucha");
animacionBtn("psiquico", "psiquico");
animacionBtn("roca", "roca");
animacionBtn("siniestro", "siniestro");
animacionBtn("tierra", "tierra");
animacionBtn("veneno", "veneno");
animacionBtn("volador", "volador");
