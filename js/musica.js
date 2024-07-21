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
