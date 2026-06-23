const images = document.querySelectorAll('.background-slider img');
let current = 0;

function changeBackground() {
    images[current].classList.remove('active');

    current = (current + 1) % images.length;

    images[current].classList.add('active');
}

// changement toutes les 7 secondes
setInterval(changeBackground, 7000);