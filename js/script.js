"use strict";

<<<<<<< HEAD
// función con el input

const input = document.querySelector("input#search");

console.log(input.value);

const pokemonData = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((respuesta) => respuesta.json()) // aqui el return esta implicito.
        .then((data) => {
            console.log("---Pokedex ---");
            console.log(`El nombre del pokemon es: ${data.name}`);
            // Mostrar habilidades:
            const pokeAbilities = data.abilities.map(
                (pokemonAbility) => pokemonAbility.ability.name
            ); //le aplicamos map al array de abilities y no a ability porque esto es un objeto y map es para arrays. CUANDO ITERAMOS RECORDAMOS QUE DEBE DE ESTAR EN SINGULAR PORQUE ITERAMOS DATO A DATO. El ultimo ability ya es el del objeto. DENTRO DE LA API DEBE DE ENTRAR A OTRA API, PERO CUANDO LE PONEMOS EL NOMBRE VA A BUSCARLO SOLO, NO DEBEMOS DE PONERLE OTRO ENLACE NI NADA.
            console.log(`Las habilidades del pokemon son: ${pokeAbilities}`);
        });
};

// EVENTO CLICK

const btnBuscar = document.querySelector("button");
console.log(btnBuscar);

btnBuscar.addEventListener("click", pokemonData(input.value));
=======
document.addEventListener("DOMContentLoaded", () => {
    const pokemonInput = document.getElementById("pokemon-input");
    const suggestionsList = document.getElementById("suggestions-list");

    // Evento input para actualizar las sugerencias según lo que el usuario escribe
    pokemonInput.addEventListener("input", () => {
        const searchTerm = pokemonInput.value.trim().toLowerCase();
        if (searchTerm.length >= 2) { // Filtrar solo si hay al menos 2 caracteres
            fetchAndDisplayPokemonSuggestions(searchTerm);
        } else {
            clearSuggestions();
        }
    });

    // Función para obtener y mostrar las sugerencias de Pokémon según el término de búsqueda
    function fetchAndDisplayPokemonSuggestions(searchTerm) {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudieron obtener los Pokémon");
                }
                return response.json();
            })
            .then(data => {
                // Filtrar la lista de Pokémon según el término de búsqueda
                const filteredPokemon = data.results.filter(pokemon => {
                    return pokemon.name.includes(searchTerm);
                });

                // Mostrar las sugerencias en la lista
                renderSuggestions(filteredPokemon);
            })
            .catch(error => {
                console.error("Error al obtener Pokémon:", error);
            });
    }

    // Función para renderizar las sugerencias en la lista
    function renderSuggestions(pokemonList) {
        clearSuggestions(); // Limpiar la lista antes de añadir nuevas sugerencias

        pokemonList.forEach(pokemon => {
            const listItem = document.createElement("li");
            listItem.textContent = pokemon.name;
            listItem.addEventListener("click", () => {
                // Cuando se hace clic en una sugerencia, llenar el input con el nombre del Pokémon y buscarlo
                pokemonInput.value = pokemon.name;
                clearSuggestions();
                searchPokemon(pokemon.name);
            });
            suggestionsList.appendChild(listItem);
        });
    }

    // Función para limpiar la lista de sugerencias
    function clearSuggestions() {
        suggestionsList.innerHTML = "";
    }

    // Evento submit del formulario
    document.querySelector(".text-search").addEventListener("submit", (event) => {
        event.preventDefault(); // Evitar el envío tradicional del formulario

        const pokemonName = pokemonInput.value.trim().toLowerCase();
        if (pokemonName) {
            searchPokemon(pokemonName);
        } else {
            alert("Por favor, introduce el nombre o número de un Pokémon.");
        }
    });

    // Función para buscar y mostrar la información del Pokémon seleccionado
    function searchPokemon(pokemonName) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Pokémon no encontrado");
                }
                return response.json();
            })
            .then(data => {
                const pokemonInfo = document.getElementById("pokemon-info");
                const frontImage = data.sprites.front_default;
                const backImage = data.sprites.back_default;
                pokemonInfo.innerHTML = `
                    <h2>${capitalizeFirstLetter(data.name)}</h2>
                    <img src="${frontImage}" alt="${data.name} front">
                    <img src="${backImage}" alt="${data.name} back">
                    <p>Altura: ${data.height / 10} m</p>
                    <p>Peso: ${data.weight / 10} kg</p>
                    <p>Puntos de vida: ${data.stats[0].base_stat}</p>
                    <p>Ataque: ${data.stats[1].base_stat}</p>
                    <p>Defensa: ${data.stats[2].base_stat}</p>
                    <p>Velocidad: ${data.stats[5].base_stat}</p>
                    <p>Tipos: ${data.types
                        .map(typeInfo => capitalizeFirstLetter(typeInfo.type.name))
                        .join(", ")}</p>
                `;
                pokemonInfo.classList.add("show");
            })
            .catch(error => {
                const pokemonInfo = document.getElementById("pokemon-info");
                pokemonInfo.innerHTML = `<p>${error.message}</p>`;
                pokemonInfo.classList.add("show"); // Mostrar el contenedor de info incluso si hay error
            });
    }

    // Función para capitalizar la primera letra de una cadena
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
>>>>>>> Angel
