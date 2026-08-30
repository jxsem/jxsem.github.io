document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // REDUCED MOTION
    // ==========================================

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }


    // ==========================================
    // ELEMENTOS
    // ==========================================

    const section = document.querySelector("#sobre-mi");

    const intro = document.querySelector("#scene-intro");
    const about = document.querySelector("#scene-about");
    const useful = document.querySelector("#scene-useful");

    const kicker = document.querySelector("#hero-kicker");
    const title = document.querySelector("#hero-title");
    const subtitle = document.querySelector("#hero-subtitle");

    const usefulText = document.querySelector("#useful-text");


    // ==========================================
    // ESTADO INICIAL
    // ==========================================

    gsap.set(about, {
        opacity: 0,
        scale: 1.15
    });

    gsap.set(useful, {
        opacity: 0,
        scale: 1.15
    });

    gsap.set(usefulText, {
        opacity: 0,
        y: 40
    });


    // ==========================================
    // TIMELINE PRINCIPAL
    // ==========================================

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,

            start: "top top",
            end: "bottom bottom",

            scrub: 1,

            // Para que la escena permanezca fija
            pin: false,

            invalidateOnRefresh: true
        }
    });


    // ==========================================
    // ESCENA 1
    // INTRO
    // ==========================================

    tl
        .to(kicker, {
            opacity: 0,
            y: -40,
            duration: 0.5
        })

        .to(title, {
            scale: 1.8,
            opacity: 0,
            y: -100,
            duration: 1
        }, "<")

        .to(subtitle, {
            opacity: 0,
            y: -40,
            duration: 0.5
        }, "<");


    // ==========================================
    // TRANSICIÓN INTRO → ABOUT
    // ==========================================

    tl
        .to(intro, {
            scale: 1.4,
            opacity: 0,
            duration: 1
        })

        .to(about, {
            opacity: 1,
            scale: 1,
            duration: 1
        }, "<");


    // ==========================================
    // ESCENA ABOUT
    // ==========================================

    tl
        .to(about, {
            scale: 1.08,
            duration: 1
        })

        .to(about, {
            opacity: 0,
            scale: 1.25,
            duration: 1
        });


    // ==========================================
    // ESCENA USEFUL
    // ==========================================

    tl
        .to(useful, {
            opacity: 1,
            scale: 1,
            duration: 1
        }, "<")

        .to(usefulText, {
            opacity: 1,
            y: 0,
            duration: 0.8
        });

});