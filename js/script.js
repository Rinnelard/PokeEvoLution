'use strict';


const input = document.querySelector('input#search');

const btnBuscar = document.querySelector('button');

const pokemonData = () => {
    const pokemonName = input.value.trim();
    console.log(pokemonName);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(respuesta => respuesta.json()) // aqui el return esta implicito.
        .then(data => {
            console.log("---Pokedex ---");
            console.log(`El nombre del pokemon es: ${data.name}`);
            // Mostrar habilidades:
            const pokeAbilities = data.abilities.map(pokemonAbility =>  pokemonAbility.ability.name); 
            console.log(`Las habilidades del pokemon son: ${pokeAbilities}`); 
        })
}
btnBuscar.addEventListener('click', pokemonData);







/* const btnBuscar = document.querySelector('button');

function valorInput() {
    const input = document.querySelector('input#search');
    let valor = input.value
    return valor;
}

const pokemonData = () => {
    const pokemonName = input.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(respuesta => respuesta.json()) 
        .then(data => {
            console.log("---Pokedex ---");
            console.log(`El nombre del pokemon es: ${data.name}`);
            const pokeAbilities = data.abilities.map(pokemonAbility =>  pokemonAbility.ability.name); 
            console.log(`Las habilidades del pokemon son: ${pokeAbilities}`); 
        })
        .catch(error => {
            console.log('Error al obtener los datos:', error);
        })
}

btnBuscar.addEventListener('click', pokemonData);
 */




