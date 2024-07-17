"use strict";

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

  // Evento click del botón de búsqueda
  btnBuscar.addEventListener("click", () => {
    const nombrePokemon = inputPokemon.value.trim().toLowerCase();
    if (nombrePokemon) {
      buscarYGuardarIndice(nombrePokemon);
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
        mostrarPokemon(data);
        currentPokemonIndex = data.id;
      })
      .catch((error) => {
        mostrarError(error.message);
      });
  }

  // Función para buscar y guardar el índice del Pokémon
  function buscarYGuardarIndice(nombrePokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Pokémon no encontrado");
        }
        return respuesta.json();
      })
      .then((data) => {
        currentPokemonIndex = data.id;
        mostrarPokemon(data);
      })
      .catch((error) => {
        mostrarError(error.message);
      });
  }

  // Función para mostrar la información del Pokémon
  function mostrarPokemon(data) {
    const pokemonInfo = document.getElementById("contenido");
    const imagenDeFrente = data.sprites.front_default;
    const imagenDeDetras = data.sprites.back_default;
    pokemonInfo.innerHTML = `
      <h2>${primeraLetraMayuscula(data.name)}</h2>
      <div class="girarCarta">
        <div class="girarCartaConstante">
          <div class="giroDeFrente">
            <img src="${imagenDeFrente}" alt="${data.name} front">
            <img id="sueloFrontal" src="./css/img/sueloPokemon.png" alt="suelo de cesped para el pokemon">
          </div>
          <div class="giroDeAtras">
            <img src="${imagenDeDetras}" alt="${data.name} back">
            <img id="sueloFrontal" src="./css/img/sueloPokemon.png" alt="suelo de cesped para el pokemon">
          </div>
        </div>
      </div>
      
      <p id="altura">Altura: ${data.height / 10} m</p>
      <p id="peso">Peso: ${data.weight / 10} kg</p>
      <p id="vida">Puntos de vida: ${data.stats[0].base_stat}</p>
      <p id="ataque">Ataque: ${data.stats[1].base_stat}</p>
      <p id="defensa">Defensa: ${data.stats[2].base_stat}</p>
      <p id="velocidad">Velocidad: ${data.stats[5].base_stat}</p>
      <p id="tipo">Tipos: ${data.types.map((typeInfo) => primeraLetraMayuscula(typeInfo.type.name)).join(", ")}</p>
    `;
    pokemonInfo.classList.add("show");
  }

  // Función para mostrar mensaje de error
  function mostrarError(message) {
    const pokemonInfo = document.getElementById("contenido");
    pokemonInfo.innerHTML = `<p>${message}</p>`;
    pokemonInfo.classList.add("show");
  }

  // Función para capitalizar la primera letra de una cadena
  function primeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
