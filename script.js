const scene = document.querySelector('#sobre-mi');

const intro = document.querySelector('#scene-intro');
const about = document.querySelector('#scene-about');
const useful = document.querySelector('#scene-useful');

const kicker = document.querySelector('#hero-kicker');
const title = document.querySelector('#hero-title');
const subtitle = document.querySelector('#hero-subtitle');

const experiencia =
document.querySelector('#experiencia');

const experienciaContent =
document.querySelector('#experiencia-content');

const usefulText =
document.querySelector('#useful-text');

const contacto =
document.querySelector('#contacto');

/* =========================================================
UTILIDADES
========================================================= */

function clamp(value, min = 0, max = 1) {
return Math.max(
min,
Math.min(max, value)
);
}

function ease(value) {


value = clamp(value);

return value * value * (3 - 2 * value);


}

function esperar(ms) {


return new Promise(resolve => {
    setTimeout(resolve, ms);
});


}

function escribir(
elemento,
texto,
velocidad = 40
) {


return new Promise(resolve => {

    let i = 0;

    function escribirCaracter() {

        if (i >= texto.length) {
            resolve();
            return;
        }

        elemento.textContent += texto[i];

        i++;

        setTimeout(
            escribirCaracter,
            velocidad
        );

    }

    escribirCaracter();

});


}

/* =========================================================
INTRO DE ESCRITURA
========================================================= */

if (
kicker &&
title &&
subtitle
) {


const reduceMotion =
    window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;


const kickerText =
    kicker.textContent.trim();

const subtitleText =
    subtitle.textContent.trim();


if (!reduceMotion) {

    kicker.textContent = '';
    subtitle.textContent = '';

    title.style.opacity = '0';
    subtitle.style.opacity = '0';

}


async function iniciarIntro() {

    if (reduceMotion) {
        return;
    }


    await esperar(500);


    await escribir(
        kicker,
        kickerText,
        40
    );


    await esperar(300);


    title.style.transition =
        'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)';

    title.style.opacity = '1';


    await esperar(900);


    subtitle.style.transition =
        'opacity 800ms ease';

    subtitle.style.opacity = '1';


    await escribir(
        subtitle,
        subtitleText,
        45
    );

}


iniciarIntro();


}

/* =========================================================
ESTADO INICIAL
========================================================= */

if (intro) {


intro.style.transformOrigin =
    'center center';

intro.style.transform =
    'scale(1)';

intro.style.opacity =
    '1';


}

if (about) {


about.style.transformOrigin =
    'center center';

about.style.transform =
    'scale(0.65)';

about.style.opacity =
    '0';


}

if (useful) {


useful.style.transformOrigin =
    'center center';

useful.style.transform =
    'scale(0.65)';

useful.style.opacity =
    '0';


}

if (experienciaContent) {


experienciaContent.style.opacity =
    '0';

experienciaContent.style.willChange =
    'opacity';


}

if (contacto) {


contacto.style.opacity =
    '0';

contacto.style.transform =
    'translateY(40px)';

contacto.style.willChange =
    'opacity, transform';


}

/* =========================================================
SOBRE MÍ
INTRO → SOBRE MÍ → CONSTRUIR
========================================================= */

function actualizarSobreMi() {


if (
    !scene ||
    !intro ||
    !about ||
    !useful
) {
    return;
}


const rect =
    scene.getBoundingClientRect();


const recorrido =
    scene.offsetHeight -
    window.innerHeight;


if (recorrido <= 0) {
    return;
}


const scrollActual =
    clamp(
        -rect.top,
        0,
        recorrido
    );


const progress =
    scrollActual / recorrido;


/* =====================================================
   1. INTRO → SOBRE MÍ
   ===================================================== */

const transition1 =
    clamp(
        progress / 0.40
    );


const transition1Ease =
    ease(transition1);


/*
 * INTRO
 *
 * 1 → 5
 */

const introScale =
    1 +
    transition1Ease * 4;


intro.style.transform =
    `scale(${introScale})`;


/*
 * INTRO OPACITY
 */

let introOpacity = 1;


if (transition1 > 0.70) {

    introOpacity =
        1 -
        clamp(
            (transition1 - 0.70) /
            0.30
        );

}


intro.style.opacity =
    introOpacity;


/*
 * SOBRE MÍ ENTRA
 *
 * 0.65 → 1
 */

const aboutProgress =
    clamp(
        (transition1 - 0.30) /
        0.70
    );


const aboutEase =
    ease(aboutProgress);


const aboutScale =
    0.65 +
    aboutEase * 0.35;


about.style.transform =
    `scale(${aboutScale})`;

about.style.opacity =
    aboutEase;


/* =====================================================
   2. SOBRE MÍ → CONSTRUIR
   ===================================================== */

const transition2 =
    clamp(
        (progress - 0.40) /
        0.60
    );


const transition2Ease =
    ease(transition2);


/*
 * SOBRE MÍ SALE
 *
 * 1 → 5
 */

if (transition2 > 0) {

    const aboutScaleOut =
        1 +
        transition2Ease * 4;


    about.style.transform =
        `scale(${aboutScaleOut})`;


    let aboutOpacity = 1;


    if (transition2 > 0.05) {

        aboutOpacity =
            1 -
            clamp(
                (transition2 - 0.05) /
                0.45
            );

    }


    about.style.opacity =
        aboutOpacity;

}


/*
 * CONSTRUIR ENTRA
 *
 * 0.65 → 1
 */

const usefulProgress =
    clamp(
        transition2 / 0.75
    );


const usefulEase =
    ease(usefulProgress);


const usefulScale =
    0.65 +
    usefulEase * 0.35;


useful.style.transform =
    `scale(${usefulScale})`;

useful.style.opacity =
    usefulEase;


/*
 * Texto de construir.
 */

if (usefulText) {

    const textProgress =
        clamp(
            (usefulProgress - 0.20) /
            0.80
        );


    usefulText.style.opacity =
        textProgress;


    usefulText.style.transform =
        `translateY(${
            30 -
            textProgress * 30
        }px)`;

}


}

/* =========================================================
EXPERIENCIA
FADE PURO
========================================================= */

function actualizarExperiencia() {


if (
    !experiencia ||
    !experienciaContent
) {
    return;
}


const rect =
    experiencia.getBoundingClientRect();


const viewport =
    window.innerHeight;


/*
 * Cuando la parte superior de Experiencia
 * entra por la parte inferior de la pantalla:
 *
 * rect.top = viewport
 *
 * empieza el fade.
 */

const distanciaDesdeEntrada =
    viewport -
    rect.top;


/*
 * El fade ocupa el 55% de una pantalla.
 */

const distanciaFade =
    viewport * 0.55;


let progress =
    distanciaDesdeEntrada /
    distanciaFade;


progress =
    clamp(progress);


const opacity =
    ease(progress);


experienciaContent.style.opacity =
    opacity;


}

/* =========================================================
CONTACTO
FADE + SUBIDA LIGADOS AL SCROLL
========================================================= */

function actualizarContacto() {


if (!contacto) {
    return;
}


const rect =
    contacto.getBoundingClientRect();


const viewport =
    window.innerHeight;


/*
 * Empieza a desvanecerse en cuanto la sección
 * asoma por abajo de la pantalla, igual que
 * Experiencia, pero con un recorrido algo más
 * largo (65% de pantalla) para que se note
 * mientras se scrollea.
 */

const distanciaDesdeEntrada =
    viewport -
    rect.top;


const distanciaFade =
    viewport * 0.65;


let progress =
    distanciaDesdeEntrada /
    distanciaFade;


progress =
    clamp(progress);


const opacity =
    ease(progress);


contacto.style.opacity =
    opacity;


contacto.style.transform =
    `translateY(${
        40 -
        opacity * 40
    }px)`;


}

/* =========================================================
LOOP DE SCROLL
========================================================= */

let ticking = false;

function actualizarTodo() {


actualizarSobreMi();

actualizarExperiencia();

actualizarContacto();

ticking = false;


}

window.addEventListener(
'scroll',
() => {


    if (ticking) {
        return;
    }


    ticking = true;


    window.requestAnimationFrame(
        actualizarTodo
    );

},
{
    passive: true
}


);

/* =========================================================
PRIMERA EJECUCIÓN
========================================================= */

actualizarTodo();