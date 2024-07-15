"use strict";

// función con el input

const pokemonData = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log("---Pokedex ---");
            console.log(`El nombre del pokemon es: ${data.name}`);
            const pokeAbilities = data.abilities.map(
                (pokemonAbility) => pokemonAbility.ability.name
            );
            console.log(`Las habilidades del pokemon son: ${pokeAbilities}`);
        });
};

//Input

function CapturarValorInput() {
    const input = document.querySelector("input#search");
}

// EVENTO CLICK

const btnBuscar = document.querySelector("button");
console.log(btnBuscar);

btnBuscar.addEventListener("click", pokemonData(input.value));
