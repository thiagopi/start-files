let w = window.innerWidth;
let h = window.innerHeight;

window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;
});

// Trigger menu
const header = document.querySelector('#header');
const btnOpenMenu = document.querySelector('.btn-open-menu');
let menuOpen = false;
btnOpenMenu.addEventListener('click', () => {
    if(menuOpen) {
        header.classList.remove('active');
        btnOpenMenu.classList.remove('active');
        menuOpen = false;
    } else {
        header.classList.add('active');
        btnOpenMenu.classList.add('active');
        menuOpen = true;
    }
});

/*
    Scroll page to element
*/
const goCont = (id, diff = 55) => {
    const elem = document.querySelector(id);

    if (w <= 500) {
        diff = h + 20;
    } else if (w > 500 && w < 584) {
        diff = 115;
    } else if (w >= 584 && w < 768) {
        diff = 95;
    } else {
        diff = 55;
    }

    // console.log(elem);
    if (elem.id) {
        // elem.scrollIntoView({ behavior: "smooth" });
        const yOffset = -diff;
        const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    header.classList.remove('active');
    btnOpenMenu.classList.remove('active');
    menuOpen = false;
}