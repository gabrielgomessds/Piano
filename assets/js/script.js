//pega as divs dentro da class oitava
const teclas = document.querySelectorAll(".oitava > div")


//retira a marcação
function desmarcar(tecla) {
    tecla.classList.remove('selecionada')
}

//marca a tecla e mostra o som quando apertada
teclas.forEach((tecla) => {
    tecla.onmousedown = () => {
        tecla.classList.add('selecionada')
        playSound(tecla.dataset.key);
    }

    //chama a função quando para de pressionar a tecla

    tecla.onmouseup = () => desmarcar(tecla)
    tecla.onmouseleave = () => desmarcar(tecla)
});

//pega o valor da tecla clicada
document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase())

});


//pega o valor do campo para compor a música
document.querySelector('.composer button').addEventListener('click', () => {

    let song = document.querySelector('#input').value;

    if (song !== '') {
        let songArray = song.split('');
        playComposition(songArray);
    }

});

//toca a musica e marca a tecla pressionada
function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    //tempo para a tecla ficar selecionada
    if (keyElement) {
        keyElement.classList.add('selecionada');

        setTimeout(() => {
            keyElement.classList.remove('selecionada');
        }, 300);
    }

}

//demora um certo tempo para poder ir para a proxima letra digitada no campo de posição
function playComposition(songArray) {
    let wait = 0;

    for (let songItem of songArray) {

        setTimeout(() => {
            playSound(`key${songItem}`)
        }, wait);

        wait += 250;

    }
}
