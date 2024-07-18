"use strict";
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
//  MODO OSCURO
const btnModoOscuro = document.getElementById("btnModoOscuro");

btnModoOscuro.addEventListener("click", () => {
  document.body.classList.toggle("modoOscuro");
  /* document.body.classList.toggle('modoOscuro'); */
});

// AUDIO
const audio = document.getElementById("audio");
const alternarAudio = document.getElementById("botonAudio");

audio.volume = 0.3;

alternarAudio.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    //alternarAudio.textContent='Pause';
  } else {
    audio.pause();

    //alternarAudio.textContent = 'Play'
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const inputPokemon = document.getElementById("inputPokemon");
  const listaDeSugerencias = document.getElementById("sugerenciasPokemon");
  const btnBuscar = document.getElementById("btnBuscar");
  const btnRetroceder = document.getElementById("btnIzquierda");
  const btnAvanzar = document.getElementById("btnDerecha");
  const btnArriba = document.getElementById("btnArriba");
  const btnAbajo = document.getElementById("btnAbajo");
  const btnEliminar = document.getElementById("btnEliminar");

  let sugerencias = []; // Array para almacenar las sugerencias de Pokémon
  let pokemonIndex = -1; // Índice inicial para el Pokémon actual mostrado
  let currentPokemonIndex = 1; // Índice inicial del Pokémon
  let intervalos = []; // Array para almacenar los intervalos y poder limpiarlos

  

  // Evento input para actualizar las sugerencias según lo que el usuario escribe
  inputPokemon.addEventListener("input", () => {
    const terminoDeBusqueda = inputPokemon.value.trim().toLowerCase();
    if (terminoDeBusqueda.length >= 2) {
      // Filtrar solo si hay al menos 2 caracteres
      mostrarSugerenciasPokemon(terminoDeBusqueda);
    } else {
      limpiarSugerencias();
    }
  });

  //Funcion para eliminar el contenido del input
  function limpiarInput() {
    inputPokemon.value = "";
  }

//Evento click para eliminar sugerencias e input
  btnEliminar.addEventListener("click", () => {
    limpiarSugerencias();
    limpiarInput();
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
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudieron obtener los Pokémon");
        }
        return respuesta.json();
      })
      .then((data) => {
        // Filtrar la lista de Pokémon según el término de búsqueda
        sugerencias = data.results.filter((pokemon) => {
          return pokemon.name.includes(terminoDeBusqueda);
        });

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
        currentPokemonIndex = data.id;
        const pokemonInfo = document.getElementById("contenido");
        const imagenDeFrente = data.sprites.front_default;
        const imagenDeDetras = data.sprites.back_default;

        // Limpiar resultados anteriores y limpiar intervalos previos
        pokemonInfo.innerHTML = "";
        intervalos.forEach(function(intervaloId) {
            clearInterval(intervaloId); // Detener cada intervalo usando su identificador único
        });
        //reseeteo de del array intervalos
        intervalos = [];

        // Preparar la información para mostrar gradualmente
        const html = `
                <h2>${primeraLetraMayuscula(data.name)}</h2>
                <div class="girarCarta">
                    <div class="giroDeFrente">
                        <img src="${imagenDeFrente}" alt="${
          data.name
        } front" alt="Imagen Pokemon frontal">

                        <img id="sueloFrontal" src="./css/img/sueloPokemon.png" alt="suelo de cesped para el pokemon">
                    </div>
                    <div class="giroDeAtras">
                        <img src="${imagenDeDetras}" alt="${
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
        const retraso = [0, 1000, 2000, 3000, 4000, 5000, 6000];

        // Mostrar datos gradualmente y almacenar los intervalos
        intervalos.push(setTimeout(() => mostrarDatoGradualmente("altura", `Altura: ${data.height / 10} m`), retraso[0]));
        intervalos.push(setTimeout(() => mostrarDatoGradualmente("peso", `Peso: ${data.weight / 10} kg`), retraso[1]));
        intervalos.push(setTimeout(() => mostrarDatoGradualmente("vida", `Puntos de vida: ${data.stats[0].base_stat}`), retraso[2]));
        intervalos.push(setTimeout(() => mostrarDatoGradualmente("ataque", `Ataque: ${data.stats[1].base_stat}`), retraso[3]));
        intervalos.push(setTimeout(() => mostrarDatoGradualmente("defensa", `Defensa: ${data.stats[2].base_stat}`), retraso[4]));
        intervalos.push(setTimeout(() => mostrarDatoGradualmente("velocidad", `Velocidad: ${data.stats[5].base_stat}`), retraso[5]));

        // Traducir los tipos a español usando el diccionario tipoTraducciones
        const tiposEnEspanol = data.types
          .map((typeInfo) => tipoTraducciones[typeInfo.type.name] || typeInfo.type.name)
          .join(", ");
        intervalos.push(setTimeout(() => mostrarDatoGradualmente("tipo", `Tipos: ${tiposEnEspanol}`), retraso[6]));
      })
      .catch((error) => {
        console.error("Error al buscar el Pokémon:", error);
        alert("Pokémon no encontrado. Por favor, verifica el nombre o número e inténtalo nuevamente.");
      });
  }



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
    }, 60); // Intervalo de tiempo entre cada caracter
    intervalos.push(intervalo); // Guardar el intervalo para poder limpiarlo después
  }
  // Función para capitalizar la primera letra de una cadena
  function primeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
});
