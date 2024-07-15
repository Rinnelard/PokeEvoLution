'use strict';

// función con el input

const input = document.querySelector('input#search')

console.log(input.value);

const pokemonData = pokemonName => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(respuesta => respuesta.json()) // aqui el return esta implicito.
        .then(data => {
            console.log("---Pokedex ---");
            console.log(`El nombre del pokemon es: ${data.name}`);
            // Mostrar habilidades:
            const pokeAbilities = data.abilities.map(pokemonAbility =>  pokemonAbility.ability.name); //le aplicamos map al array de abilities y no a ability porque esto es un objeto y map es para arrays. CUANDO ITERAMOS RECORDAMOS QUE DEBE DE ESTAR EN SINGULAR PORQUE ITERAMOS DATO A DATO. El ultimo ability ya es el del objeto. DENTRO DE LA API DEBE DE ENTRAR A OTRA API, PERO CUANDO LE PONEMOS EL NOMBRE VA A BUSCARLO SOLO, NO DEBEMOS DE PONERLE OTRO ENLACE NI NADA.
            console.log(`Las habilidades del pokemon son: ${pokeAbilities}`); 
        })
}

// EVENTO CLICK

const btnBuscar = document.querySelector('button');
console.log(btnBuscar);


btnBuscar.addEventListener('click', pokemonData(input.value));




