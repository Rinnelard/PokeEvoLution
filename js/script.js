"use strict";

// Retirar tapa con estilo

document.getElementById("tapaPokedexMovil").addEventListener("click", () => {
    document.getElementById("tapaPokedexMovil").classList.add("abrirTapa");
});

// Diccionario de traducción de tipos de Pokémon de inglés a español
const tipoTraducciones = {
    normal: "Normal",
    fighting: "Lucha",
    flying: "Volador",
    poison: "Veneno",
    ground: "Tierra",
    rock: "Roca",
    bug: "Bicho",
    ghost: "Fantasma",
    steel: "Acero",
    fire: "Fuego",
    water: "Agua",
    grass: "Planta",
    electric: "Eléctrico",
    psychic: "Psíquico",
    ice: "Hielo",
    dragon: "Dragón",
    dark: "Siniestro",
    fairy: "Hada",
};
//  -------------------------- MODO OSCURO --------------------------
const btnModoOscuro = document.getElementById("btnModoOscuro");

btnModoOscuro.addEventListener("click", () => {
    document.body.classList.toggle("modoOscuro");
    /* document.body.classList.toggle('modoOscuro'); */
});

// -------------------------- AUDIO --------------------------
const audio = document.getElementById("audio");
const alternarAudio = document.getElementById("botonAudio");

audio.volume = 0.3;

alternarAudio.addEventListener("click", () => {
    const pokeball = document.getElementById("pokeballGiratoria");
    if (audio.paused) {
        audio.play();
        pokeball.classList.add("girandoPokebola");
        //alternarAudio.textContent='Pause';
    } else {
        audio.pause();
        pokeball.classList.remove("girandoPokebola");

        //alternarAudio.textContent = 'Play'
    }
});

function asignarAudioBtn(rutaBtn) {
    const boton = document.getElementById(rutaBtn);
    const audio = new Audio("./css/audio/sonidoBtn.mp3");

    boton.addEventListener("click", () => {
        audio.currentTime = 0;
        audio.play();
    });
}

asignarAudioBtn("btnBuscar");
asignarAudioBtn("btnEliminar");
asignarAudioBtn("btnDerecha");
asignarAudioBtn("btnIzquierda");
asignarAudioBtn("btnArriba");
asignarAudioBtn("btnAbajo");
asignarAudioBtn("botonAudio");
asignarAudioBtn("btnModoOscuro");

// -------------------------- ANIMACIÓN BOTONES --------------------------

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

//Animación cruceta

function animacionCruceta(direccion, urlImagen) {
    // Al hacer clic en el botón, cambiamos a imagen con perspectiva
    function animarCruceta(direccion, urlImagen) {
        // Funcionamiento en PC
        document
            .getElementById(`btn${direccion}`)
            .addEventListener("mousedown", function () {
                /* Disminuir el tamaño a la imagen seleccionada */
                function animarImg(idImagen) {
                    document.getElementById(idImagen).src = urlImagen;
                }
                animarImg("imgCruceta");
            });
        // Funcionamiento en movil
        document
            .getElementById(`btn${direccion}`)
            .addEventListener("touchstart", function () {
                /* Disminuir el tamaño a la imagen seleccionada */
                function animarImg(idImagen) {
                    document.getElementById(idImagen).src = urlImagen;
                }
                animarImg("imgCruceta");
            });
    }

    // Al soltar el clic, volvemos al tamaño original
    function desAnimarCruceta(btn, idImagen, urlImagen) {
        // Funcionamiento en PC
        document
            .getElementById(`btn${direccion}`)
            .addEventListener("mouseup", function () {
                /* Disminuir el tamaño a la imagen seleccionada */
                function animarImg(idImagen) {
                    document.getElementById(idImagen).src =
                        "./css/img/crucetaNormal.png";
                }
                animarImg("imgCruceta");
            });
        // Funcionamiento en movil
        document
            .getElementById(`btn${direccion}`)
            .addEventListener("touchend", function () {
                /* Disminuir el tamaño a la imagen seleccionada */
                function animarImg(idImagen) {
                    document.getElementById(idImagen).src = urlImagen;
                }
                animarImg("imgCruceta");
            });
    }

    animarCruceta(direccion, urlImagen);
    desAnimarCruceta(direccion, urlImagen);
}

animacionCruceta("Arriba", "./css/img/flechaArriba.png");
animacionCruceta("Abajo", "./css/img/flechaAbajo.png");
animacionCruceta("Derecha", "./css/img/flechaDerecha.png");
animacionCruceta("Izquierda", "./css/img/flechaIzquierda.png");

// -------------------------- FIN ANIMACIÓN BOTONES --------------------------

document.addEventListener("DOMContentLoaded", () => {
    const inputPokemon = document.getElementById("inputPokemon");
    const listaDeSugerencias = document.getElementById("sugerenciasPokemon");
    const btnBuscar = document.getElementById("btnBuscar");
    const btnRetroceder = document.getElementById("btnIzquierda");
    const btnAvanzar = document.getElementById("btnDerecha");
    const btnArriba = document.getElementById("btnArriba");
    const btnAbajo = document.getElementById("btnAbajo");

    let sugerencias = []; // Array para almacenar las sugerencias de Pokémon
    let pokemonIndex = -1; // Índice inicial para el Pokémon actual mostrado
    let currentPokemonIndex = 1; // Índice inicial del Pokémon
    let intervalos = []; // Array para almacenar los intervalos y poder limpiarlos

    // Evento input para actualizar las sugerencias según lo que el usuario escribe
    inputPokemon.addEventListener("input", () => {
        const terminoDeBusqueda = inputPokemon.value.trim().toLowerCase();
        if (terminoDeBusqueda.length >= 0) {
            // Filtrar solo si hay al menos 2 caracteres
            mostrarSugerenciasPokemon(terminoDeBusqueda);
        } else {
            limpiarSugerencias();
        }
    });

    // Evento click del botón de búsqueda
    btnBuscar.addEventListener("click", () => {
        const nombrePokemon = inputPokemon.value.trim().toLowerCase();
        if (nombrePokemon) {
            buscarPokemon(nombrePokemon);
        } else {
            alert("Por favor, introduce el nombre o número de un Pokémon.");
        }
    });

    //evento para buscar con la tecla enter
    inputPokemon.addEventListener("keydown", (event) =>{
        if (event.key === "Enter") {
            event.preventDefault();
            const nombrePokemon = inputPokemon.value.trim().toLowerCase();
            if (nombrePokemon) {
                buscarPokemon(nombrePokemon);
            }
        }
    });

    // Evento click del botón para bajar en la lista
    btnAbajo.addEventListener("click", () => {
        if (pokemonIndex < sugerencias.length - 1) {
            pokemonIndex++;
            const nombrePokemon = sugerencias[pokemonIndex].name;
            buscarPokemon(nombrePokemon);
        }
    });

    // Evento click del botón para subir en la lista
    btnArriba.addEventListener("click", () => {
        if (pokemonIndex > 0) {
            pokemonIndex--;
            const nombrePokemon = sugerencias[pokemonIndex].name;
            buscarPokemon(nombrePokemon);
        }
    });

    // Evento click del botón de Avanzar
    btnAvanzar.addEventListener("click", () => {
        currentPokemonIndex++;
        buscarPokemon(currentPokemonIndex.toString());
    });

    // Evento click del botón de Retroceder
    btnRetroceder.addEventListener("click", () => {
        if (currentPokemonIndex > 1) {
            currentPokemonIndex--;
            buscarPokemon(currentPokemonIndex.toString());
        }
    });

    // Función para obtener y mostrar las sugerencias de Pokémon según el término de búsqueda
    function mostrarSugerenciasPokemon(terminoDeBusqueda) {
        const terminoEsNumero =
            !isNaN(terminoDeBusqueda) &&
            Number.isInteger(parseFloat(terminoDeBusqueda));

        fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("No se pudieron obtener los Pokémon");
                }
                return respuesta.json();
            })
            .then((data) => {
                if (terminoEsNumero) {
                    sugerencias = data.results.filter(
                        (pokemon, index) =>
                            index + 1 === parseInt(terminoDeBusqueda)
                    );
                } else {
                    // Filtrar la lista de Pokémon según el término de búsqueda
                    sugerencias = data.results.filter((pokemon) => {
                        return pokemon.name.includes(terminoDeBusqueda);
                    });
                }
                // ordenar por orden alfabetico
                sugerencias.sort((a, b) => a.name.localeCompare(b.name));

                // Mostrar las sugerencias en la lista
                mostrarSugerencias(sugerencias);

                // Reiniciar el índice de Pokémon mostrado después de la búsqueda
                pokemonIndex = -1;
            })
            .catch((error) => {
                console.error("Error al obtener Pokémon:", error);
            });
    }

    // Función para renderizar las sugerencias en la lista
    function mostrarSugerencias(listaDePokemon) {
        limpiarSugerencias(); // Limpiar la lista antes de añadir nuevas sugerencias

        listaDePokemon.forEach((pokemon) => {
            const listaPokemon = document.createElement("li");
            listaPokemon.textContent = pokemon.name;
            listaPokemon.addEventListener("click", () => {
                // Cuando se hace clic en una sugerencia, llenar el input con el nombre del Pokémon y buscarlo
                inputPokemon.value = pokemon.name;
                limpiarSugerencias();
                buscarPokemon(pokemon.name);
            });
            listaDeSugerencias.appendChild(listaPokemon);
        });
    }

    // Función para limpiar la lista de sugerencias
    function limpiarSugerencias() {
        listaDeSugerencias.innerHTML = "";
    }

    // Función para buscar y mostrar la información del Pokémon seleccionado
    function buscarPokemon(nombrePokemon) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Pokémon no encontrado");
                }
                return respuesta.json();
            })
            .then((data) => {
                const pokemonInfo = document.getElementById("contenido");
                const imagenDeFrente = data.sprites.front_default;
                const imagenDeDetras = data.sprites.back_default || imagenDeFrente;// si no tiene imagen de atras muestra directamente la de frente otra vez
                const pokedexPcInicio = document.getElementById("img2");
                pokedexPcInicio.src = "./css/img/podekexPc.png";

                // Limpiar resultados anteriores y limpiar intervalos previos
                pokemonInfo.innerHTML = "";
                intervalos.forEach(function (intervaloId) {
                    clearInterval(intervaloId); // Detener cada intervalo usando su identificador único
                });
                //reseeteo de del array intervalos
                intervalos = [];

                // Preparar la información para mostrar gradualmente
                const html = `
                <h2>${primeraLetraMayuscula(data.name)}</h2>
                <h3>#${data.id}</h3>
                <div class="girarCarta">
                    <div class="giroDeFrente">
                        <img id="imgDefrente" src="${imagenDeFrente}" alt="imgDefrente"${
                    data.name
                } front" alt="Imagen Pokemon frontal">

                        <img id="sueloFrontal" src="./css/img/sueloPokemon.png" alt="suelo de cesped para el pokemon">
                    </div>
                    <div class="giroDeAtras">
                        <img id="imgDetras" src="${imagenDeDetras}" alt=imgDetras"${
                    data.name
                } back"alt="Imagen Pokemon back">
                        <img id="sueloFrontal" src="./css/img/sueloPokemon.png" alt="suelo de cesped para el pokemon">
                    </div>
                </div>
                
                <p id="altura"> <span></span></p>
                <p id="peso"><span></span></p>
                <p id="vida"><span></span></p>
                <p id="ataque"><span></span></p>
                <p id="defensa"><span></span></p>
                <p id="velocidad"> <span></span></p>
                <p id="tipo"><span></span></p>
                `;

                pokemonInfo.innerHTML = html;
                pokemonInfo.classList.add("show");

                //retraso de cada dato en milisegundos
                const retraso = [0, 500, 1000, 1800, 2200, 2800, 3200];

                // Mostrar datos gradualmente y almacenar los intervalos
                intervalos.push(
                    setTimeout(
                        () =>
                            mostrarDatoGradualmente(
                                "altura",
                                `Altura: ${data.height / 10} m`
                            ),
                        retraso[0]
                    )
                );
                intervalos.push(
                    setTimeout(
                        () =>
                            mostrarDatoGradualmente(
                                "peso",
                                `Peso: ${data.weight / 10} kg`
                            ),
                        retraso[1]
                    )
                );
                intervalos.push(
                    setTimeout(
                        () =>
                            mostrarDatoGradualmente(
                                "vida",
                                `Puntos de vida: ${data.stats[0].base_stat}`
                            ),
                        retraso[2]
                    )
                );
                intervalos.push(
                    setTimeout(
                        () =>
                            mostrarDatoGradualmente(
                                "ataque",
                                `Ataque: ${data.stats[1].base_stat}`
                            ),
                        retraso[3]
                    )
                );
                intervalos.push(
                    setTimeout(
                        () =>
                            mostrarDatoGradualmente(
                                "defensa",
                                `Defensa: ${data.stats[2].base_stat}`
                            ),
                        retraso[4]
                    )
                );
                intervalos.push(
                    setTimeout(
                        () =>
                            mostrarDatoGradualmente(
                                "velocidad",
                                `Velocidad: ${data.stats[5].base_stat}`
                            ),
                        retraso[5]
                    )
                );

                // Traducir los tipos a español usando el diccionario tipoTraducciones
                const tiposEnEspanol = data.types
                    .map(
                        (typeInfo) =>
                            tipoTraducciones[typeInfo.type.name] ||
                            typeInfo.type.name
                    )
                    .join(", ");
                intervalos.push(
                    setTimeout(
                        () =>
                            mostrarDatoGradualmente(
                                "tipo",
                                `Tipos: ${tiposEnEspanol}`
                            ),
                        retraso[6]
                    )
                );
            })
            .catch((error) => {
                mostrarError(error.message);
            });
    }

    //funcion para eliminar datos con el btnEliminar
    function eliminarDatos(){
        const pokemonInfo = document.getElementById("contenido");
        const input = document.getElementById("inputPokemon");
        pokemonInfo.innerHTML = "";
        if (input) {
            input.value = "";  
        }
        intervalos.forEach(function (intervaloId){
            clearInterval(intervaloId);
        });
        intervalos = [];
    }
    // Asociar la función eliminarDatos al botón btnEliminar
    document.getElementById("btnEliminar").addEventListener("click", eliminarDatos);

    // Función para mostrar mensaje de error
    function mostrarError(message) {
        const pokemonInfo = document.getElementById("contenido");
        pokemonInfo.innerHTML = `<p>${message}</p>`;
        pokemonInfo.classList.add("show");
    }

    // Función para mostrar un dato gradualmente
    function mostrarDatoGradualmente(idElemento, texto) {
        const elemento = document.getElementById(idElemento);
        elemento.innerHTML = ""; // Limpiar el contenido original

        // Mostrar el texto caracter por caracter
        let index = 0;
        const intervalo = setInterval(() => {
            elemento.innerHTML += texto[index];
            index++;
            if (index >= texto.length) {
                clearInterval(intervalo);
            }
        }, 30); // Intervalo de tiempo entre cada caracter
        intervalos.push(intervalo); // Guardar el intervalo para poder limpiarlo después
    }
    // Función para capitalizar la primera letra de una cadena
    function primeraLetraMayuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
//----------------------------boton Instrucciones--------------------

const btnInstrucciones = document.getElementById("btnInstrucciones");
const imagenInstrucciones = document.getElementById("imagenInstrucciones");

btnInstrucciones.addEventListener("click", () => {
    if (imagenInstrucciones.style.display === "none") {
        imagenInstrucciones.style.display = "block";
    } else {
        imagenInstrucciones.style.display = "none"
    }
});
