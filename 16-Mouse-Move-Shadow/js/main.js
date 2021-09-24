const hero = document.querySelector('.hero')
const text = document.querySelector('h1')
const walk = 200;

function shadow(e){
    // Get the width and height of the thing that we have hovered over used destructuring
    const { offsetWidth: width, offsetHeight: height } = hero
    // Where the person cursor was?
    let { offsetX: x, offsetY: y } = e

    // The event is giving the x and y of the element so do some normalization
    // Modify the x and y
    if (this !== e.target) {
        x = x + e.target.offsetLeft
        y = y + e.target.offsetTop
    }

    // Figure out how far should the text shadow actually go
    const xWalk = (Math.round(x / width * walk) - (walk / 2))
    const yWalk = (Math.round(y / height * walk) - (walk / 2))

    text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255, 69, 0, 0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(255, 255, 0, 0.7)
    `;
}

hero.addEventListener('mousemove', shadow)