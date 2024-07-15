"use strict";

document.querySelector(".text-search").addEventListener("submit", (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    const pokemonNameOrId = document
        .getElementById("search")
        .value.toLowerCase()
        .trim();
    if (pokemonNameOrId) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Pokémon no encontrado");
                }
                return response.json();
            })
            .then((data) => {
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
                        .map((typeInfo) =>
                            capitalizeFirstLetter(typeInfo.type.name)
                        )
                        .join(", ")}</p>
                `;
            })
            .catch((error) => {
                const pokemonInfo = document.getElementById("pokemon-info");
                pokemonInfo.innerHTML = `<p>${error.message}</p>`;
            });
    } else {
        alert("Por favor, escribe el nombre o el número de un Pokémon.");
    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
