```javascript
/* ==================================================
   SCREEN NAVIGATION
================================================== */

const screens =
    document.querySelectorAll(".screen");

function show(id) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    setTimeout(() => {

        document
            .getElementById(id)
            .classList.add("active");

    }, 60);
}


/* ==================================================
   STARS
================================================== */

const stars =
    document.getElementById("stars");

for (let i = 0; i < 100; i++) {

    const star =
        document.createElement("div");

    star.className = "star";

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";

    const size =
        1 + Math.random() * 2;

    star.style.width =
        size + "px";

    star.style.height =
        size + "px";

    star.style.animationDuration =
        2.5 + Math.random() * 5 + "s";

    star.style.animationDelay =
        Math.random() * 5 + "s";

    stars.appendChild(star);
}


/* ==================================================
   SHOOTING STARS
================================================== */

function shootingStar() {

    const container =
        document.getElementById(
            "shootingStars"
        );

    const star =
        document.createElement("div");

    star.className = "shooting";

    star.style.left =
        70 + Math.random() * 30 + "%";

    star.style.top =
        Math.random() * 40 + "%";

    container.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 1500);
}

setInterval(
    shootingStar,
    6500
);


/* ==================================================
   MUSIC
================================================== */

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

const musicHint =
    document.getElementById("musicHint");

let musicStarted = false;

function startMusic() {

    if (musicStarted)
        return;

    music.volume = .22;

    music.play()
        .then(() => {

            musicStarted = true;

            musicHint.classList.add(
                "hide"
            );

            musicButton.textContent =
                "♫";

        })
        .catch(() => {});

}

document.addEventListener(
    "click",
    () => {

        startMusic();

    },
    {
        once: true
    }
);


musicButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        if (music.paused) {

            music.play();

            musicButton.textContent =
                "♫";

        } else {

            music.pause();

            musicButton.textContent =
                "♪";

        }

    }
);


/* ==================================================
   COUNTDOWN
================================================== */

/*
    IMPORTANT:

    The target is August 31 at 00:00
    using the user's local device time.
*/

function getNextAugust31() {

    const now =
        new Date();

    let year =
        now.getFullYear();

    let target =
        new Date(
            year,
            7,
            31,
            0,
            0,
            0,
            0
        );

    if (now >= target) {

        target =
            new Date(
                year + 1,
                7,
                31,
                0,
                0,
                0,
                0
            );

    }

    return target;
}

const targetDate =
    getNextAugust31();


const days =
    document.getElementById("days");

const hours =
    document.getElementById("hours");

const minutes =
    document.getElementById("minutes");

const seconds =
    document.getElementById("seconds");

const timer =
    document.getElementById("timer");

const miniCountdown =
    document.getElementById(
        "miniCountdown"
    );

const miniNumber =
    document.getElementById(
        "miniNumber"
    );


let finalCountdownRunning =
    false;


function updateTimer() {

    if (finalCountdownRunning)
        return;

    const now =
        new Date();

    const difference =
        targetDate - now;


    if (difference <= 0) {

        beginFinalCountdown();

        return;
    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const d =
        Math.floor(
            totalSeconds / 86400
        );

    const h =
        Math.floor(
            (totalSeconds % 86400)
            / 3600
        );

    const m =
        Math.floor(
            (totalSeconds % 3600)
            / 60
        );

    const s =
        totalSeconds % 60;


    days.textContent =
        String(d).padStart(2,"0");

    hours.textContent =
        String(h).padStart(2,"0");

    minutes.textContent =
        String(m).padStart(2,"0");

    seconds.textContent =
        String(s).padStart(2,"0");
}


function beginFinalCountdown() {

    if (finalCountdownRunning)
        return;

    finalCountdownRunning = true;


    timer.classList.add(
        "hidden"
    );


    miniCountdown.classList.remove(
        "hidden"
    );


    let number = 10;

    miniNumber.textContent =
        number;


    const interval =
        setInterval(() => {

            number--;

            if (number <= 0) {

                clearInterval(interval);

                smallBurst(
                    window.innerWidth / 2,
                    window.innerHeight / 2
                );

                show("welcome");

                startMusic();

                return;
            }

            miniNumber.textContent =
                number;

        }, 1000);
}


updateTimer();

setInterval(
    updateTimer,
    1000
);


/* ==================================================
   SKIP
================================================== */

document
    .getElementById("skipButton")
    .addEventListener(
        "click",
        () => {

            smallBurst(
                window.innerWidth / 2,
                window.innerHeight / 2
            );

            startMusic();

            show("welcome");

        }
    );


/* ==================================================
   WELCOME
================================================== */

document
    .getElementById("openButton")
    .addEventListener(
        "click",
        () => {

            smallBurst(
                window.innerWidth / 2,
                window.innerHeight / 2
            );

            show("letter");

        }
    );


/* ==================================================
   ENVELOPE
================================================== */

const envelope =
    document.getElementById(
        "envelope"
    );

const tapHint =
    document.getElementById(
        "tapHint"
    );

const letterContinue =
    document.getElementById(
        "letterContinue"
    );


envelope.addEventListener(
    "click",
    () => {

        if (
            envelope.classList.contains(
                "open"
            )
        ) return;


        const rect =
            envelope.getBoundingClientRect();


        smallBurst(
            rect.left +
                rect.width / 2,

            rect.top +
                rect.height / 2
        );


        envelope.classList.add(
            "open"
        );


        tapHint.textContent =
            "✦";


        setTimeout(() => {

            letterContinue.classList.remove(
                "hidden"
            );

        }, 1200);

    }
);


letterContinue.addEventListener(
    "click",
    () => {

        show("memories");

    }
);


/* ==================================================
   PHOTO VIEWER
================================================== */

const viewer =
    document.getElementById(
        "imageViewer"
    );

const viewerImage =
    document.getElementById(
        "viewerImage"
    );


document
    .querySelectorAll(".photoCard")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const image =
                    card.querySelector(
                        "img"
                    );

                viewerImage.src =
                    image.src;

                viewer.classList.add(
                    "show"
                );

            }
        );

    });


document
    .getElementById("closeImage")
    .addEventListener(
        "click",
        () => {

            viewer.classList.remove(
                "show"
            );

        }
    );


viewer.addEventListener(
    "click",
    event => {

        if (
            event.target === viewer
        ) {

            viewer.classList.remove(
                "show"
            );

        }

    }
);


/* ==================================================
   VIDEO
================================================== */

document
    .getElementById("videoButton")
    .addEventListener(
        "click",
        () => {

            show("videoScreen");

        }
    );


document
    .getElementById("finishButton")
    .addEventListener(
        "click",
        () => {

            show("final");

            setTimeout(
                startFireworks,
                300
            );

        }
    );


/* ==================================================
   LIGHT BURST
   intentionally subtle
================================================== */

function smallBurst(
    x,
    y
) {

    const symbols = [
        "✦",
        "✧",
        "⋆"
    ];


    for (
        let i = 0;
        i < 9;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );

        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        particle.style.position =
            "fixed";

        particle.style.left =
            x + "px";

        particle.style.top =
            y + "px";

        particle.style.zIndex =
            "9999";

        particle.style.pointerEvents =
            "none";

        particle.style.color =
            "rgba(255,255,255,.8)";

        particle.style.fontSize =
            8 +
            Math.random() * 7 +
            "px";


        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            25 +
            Math.random() *
            50;


        particle.animate(
            [
                {
                    transform:
                        "translate(-50%,-50%) scale(.5)",

                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%,-50%) scale(1)",

                    opacity: .8
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${
                                Math.cos(angle) *
                                distance
                            }px),
                            calc(-50% + ${
                                Math.sin(angle) *
                                distance
                            }px)
                        ) scale(.4)`,

                    opacity: 0
                }
            ],
            {
                duration:
                    650 +
                    Math.random() *
                    250,

                easing:
                    "cubic-bezier(.22,1,.36,1)"
            }
        );


        document.body.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, 1000);

    }
}


/* ==================================================
   SOFT FIREWORKS
================================================== */

const canvas =
    document.getElementById(
        "fireworks"
    );

const ctx =
    canvas.getContext("2d");

let fireworksStarted =
    false;


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


function startFireworks() {

    if (fireworksStarted)
        return;

    fireworksStarted = true;

    /*
        Only occasional small bursts.
        Not the giant explosion from before.
    */

    createFirework();

    setTimeout(
        createFirework,
        900
    );

    setTimeout(
        createFirework,
        1900
    );

    animateFireworks();
}


let particles = [];


function createFirework() {

    const x =
        15 +
        Math.random() * 70;

    const y =
        15 +
        Math.random() * 45;


    for (
        let i = 0;
        i < 24;
        i++
    ) {

        const angle =
            (
                Math.PI * 2
            ) *
            i /
            24;

        const speed =
            1.1 +
            Math.random() *
            1.4;


        particles.push({

            x,
            y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 1

        });

    }
}


function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles =
        particles.filter(
            particle =>
                particle.life > 0
        );


    particles.forEach(
        particle => {

            particle.x +=
                particle.vx;

            particle.y +=
                particle.vy;

            particle.vy +=
                .018;

            particle.life -=
                .018;


            ctx.beginPath();

            ctx.arc(
                particle.x *
                    canvas.width /
                    100,

                particle.y *
                    canvas.height /
                    100,

                1.2,

                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(
                    255,
                    170,
                    200,
                    ${particle.life}
                )`;

            ctx.fill();

        }
    );


    requestAnimationFrame(
        animateFireworks
    );
}
```
