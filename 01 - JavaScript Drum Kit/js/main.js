window.addEventListener('keydown', playSound);

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    // If there is no audio stop the function from running
    if(!audio) return;

    // Plays audio without delay
    audio.currentTime = 0;
    audio.play();

    key.classList.add('playing');
}
function removeTransition(e){
    // If the there is not a transform skip
    if(e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}