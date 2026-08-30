```javascript
/* =========================================================
   BIRTHDAY SURPRISE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SCREEN SYSTEM
       ===================================================== */

    const screens = document.querySelectorAll(".screen");

    function showScreen(id) {

        screens.forEach(screen => {
            screen.classList.remove("active");
        });

        const target = document.getElementById(id);

        if (target) {
            target.classList.add("active");
        }
    }


    /* =====================================================
       BACKGROUND STARS
       ===================================================== */

    const starsContainer =
        document.getElementById("stars");

    for (let i = 0; i < 110; i++) {

        const star =
            document.createElement("div");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        const size =
            1 + Math.random() * 1.8;

        star.style.width =
            size + "px";

        star.style.height =
            size + "px";

        star.style.animationDuration =
            3 + Math.random() * 5 + "s";

        star.style.animationDelay =
            Math.random() * 5 + "s";

        starsContainer.appendChild(star);
    }


    /* =====================================================
       SHOOTING STARS
       ===================================================== */

    function createShootingStar() {

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
            Math.random() * 45 + "%";

        container.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 1500);
    }

    setInterval(
        createShootingStar,
        6500
    );


    /* =====================================================
       MUSIC
       ===================================================== */

    const music =
        document.getElementById("music");

    const musicHint =
        document.getElementById("musicHint");

    const musicButton =
        document.getElementById("musicButton");

    let musicPlaying = false;


    function startMusic() {

        if (!music) return;

        music.volume = 0.22;

        music.play()
            .then(() => {

                musicPlaying = true;

                if (musicHint) {
                    musicHint.classList.add("hide");
                }

                if (musicButton) {
                    musicButton.textContent = "♫";
                }

            })
            .catch(() => {
                // Browser may block autoplay.
            });
    }


    document.addEventListener(
        "click",
        startMusic,
        { once: true }
    );


    if (musicButton) {

        musicButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                if (music.paused) {

                    music.play();

                    musicPlaying = true;

                    musicButton.textContent =
                        "♫";

                } else {

                    music.pause();

                    musicPlaying = false;

                    musicButton.textContent =
                        "♪";
                }
            }
        );
    }


    /* =====================================================
       COUNTDOWN
       ===================================================== */

    const daysEl =
        document.getElementById("days");

    const hoursEl =
        document.getElementById("hours");

    const minutesEl =
        document.getElementById("minutes");

    const secondsEl =
        document.getElementById("seconds");

    const timerEl =
        document.getElementById("timer");

    const miniCountdown =
        document.getElementById(
            "miniCountdown"
        );

    const miniNumber =
        document.getElementById(
            "miniNumber"
        );

    const skipButton =
        document.getElementById(
            "skipButton"
        );


    /*
       IMPORTANT:

       August is month 7 in JavaScript.

       This points to:
       August 31, 2026
       12:00:00 AM
    */

    const targetDate =
        new Date(
            2026,
            7,
            31,
            0,
            0,
            0
        );


    let countdownFinished = false;
    let finalCountdownStarted = false;


    function updateCountdown() {

        if (countdownFinished) {
            return;
        }

        const now =
            new Date();

        let difference =
            targetDate.getTime()
            - now.getTime();


        /* ================================================
           MIDNIGHT REACHED
           ================================================ */

        if (difference <= 0) {

            start10SecondCountdown();

            return;
        }


        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        const days =
            Math.floor(
                totalSeconds / 86400
            );

        const hours =
            Math.floor(
                (totalSeconds % 86400)
                / 3600
            );

        const minutes =
            Math.floor(
                (totalSeconds % 3600)
                / 60
            );

        const seconds =
            totalSeconds % 60;


        daysEl.textContent =
            String(days).padStart(
                2,
                "0"
            );

        hoursEl.textContent =
            String(hours).padStart(
                2,
                "0"
            );

        minutesEl.textContent =
            String(minutes).padStart(
                2,
                "0"
            );

        secondsEl.textContent =
            String(seconds).padStart(
                2,
                "0"
            );
    }


    /* =====================================================
       10 → 1
       ===================================================== */

    function start10SecondCountdown() {

        if (finalCountdownStarted) {
            return;
        }

        finalCountdownStarted = true;

        timerEl.classList.add(
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

                    clearInterval(
                        interval
                    );

                    countdownFinished =
                        true;

                    smallBurst(
                        window.innerWidth / 2,
                        window.innerHeight / 2
                    );

                    setTimeout(() => {

                        showScreen(
                            "welcome"
                        );

                        startMusic();

                    }, 250);

                    return;
                }


                miniNumber.textContent =
                    number;

            }, 1000);
    }


    /*
       Start immediately.
    */

    updateCountdown();


    /*
       Update every 250ms so midnight
       is caught accurately.
    */

    setInterval(
        updateCountdown,
        250
    );


    /* =====================================================
       SKIP BUTTON
       ===================================================== */

    if (skipButton) {

        skipButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                countdownFinished =
                    true;

                finalCountdownStarted =
                    true;

                smallBurst(
                    window.innerWidth / 2,
                    window.innerHeight / 2
                );

                startMusic();

                /*
                   DIRECTLY SHOW WELCOME.
                   No timeout.
                */

                showScreen(
                    "welcome"
                );

            }
        );
    }


    /* =====================================================
       WELCOME
       ===================================================== */

    const openButton =
        document.getElementById(
            "openButton"
        );


    if (openButton) {

        openButton.addEventListener(
            "click",
            () => {

                smallBurst(
                    window.innerWidth / 2,
                    window.innerHeight / 2
                );

                showScreen(
                    "letter"
                );

            }
        );
    }


    /* =====================================================
       ENVELOPE
       ===================================================== */

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


    if (envelope) {

        envelope.addEventListener(
            "click",
            () => {

                if (
                    envelope.classList.contains(
                        "open"
                    )
                ) {
                    return;
                }


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


                if (tapHint) {

                    tapHint.textContent =
                        "✦";
                }


                setTimeout(() => {

                    if (letterContinue) {

                        letterContinue.classList.remove(
                            "hidden"
                        );
                    }

                }, 1000);

            }
        );
    }


    if (letterContinue) {

        letterContinue.addEventListener(
            "click",
            () => {

                showScreen(
                    "memories"
                );

            }
        );
    }


    /* =====================================================
       PHOTO VIEWER
       ===================================================== */

    const viewer =
        document.getElementById(
            "imageViewer"
        );

    const viewerImage =
        document.getElementById(
            "viewerImage"
        );

    const closeImage =
        document.getElementById(
            "closeImage"
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

                    if (!image) return;

                    viewerImage.src =
                        image.src;

                    viewer.classList.add(
                        "show"
                    );

                }
            );

        });


    if (closeImage) {

        closeImage.addEventListener(
            "click",
            () => {

                viewer.classList.remove(
                    "show"
                );

            }
        );
    }


    if (viewer) {

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
    }


    /* =====================================================
       VIDEO
       ===================================================== */

    const videoButton =
        document.getElementById(
            "videoButton"
        );

    const finishButton =
        document.getElementById(
            "finishButton"
        );


    if (videoButton) {

        videoButton.addEventListener(
            "click",
            () => {

                showScreen(
                    "videoScreen"
                );

            }
        );
    }


    if (finishButton) {

        finishButton.addEventListener(
            "click",
            () => {

                showScreen(
                    "final"
                );

                setTimeout(
                    startFireworks,
                    250
                );

            }
        );
    }


    /* =====================================================
       SMALL SPARKLE BURST
       ===================================================== */

    function smallBurst(x, y) {

        const symbols = [
            "✦",
            "✧",
            "⋆"
        ];


        for (let i = 0; i < 8; i++) {

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
                "99999";

            particle.style.pointerEvents =
                "none";

            particle.style.color =
                "rgba(255,255,255,.8)";

            particle.style.fontSize =
                (
                    8 +
                    Math.random() * 7
                ) + "px";


            const angle =
                Math.random() *
                Math.PI *
                2;

            const distance =
                25 +
                Math.random() *
                45;


            particle.animate(

                [
                    {
                        transform:
                            "translate(-50%,-50%) scale(.4)",

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
                            scale(.3)`,

                        opacity: 0
                    }
                ],

                {
                    duration:
                        650 +
                        Math.random() *
                        200,

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


    /* =====================================================
       SOFT FIREWORKS
       ===================================================== */

    const canvas =
        document.getElementById(
            "fireworks"
        );

    const ctx =
        canvas.getContext("2d");

    let particles = [];
    let fireworksStarted = false;


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
                Math.PI *
                2 *
                i /
                24;

            const speed =
                1.1 +
                Math.random() * 1.2;


            particles.push({

                x: x / 100,
                y: y / 100,

                vx:
                    Math.cos(angle) *
                    speed /
                    100,

                vy:
                    Math.sin(angle) *
                    speed /
                    100,

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
                    0.00018;

                particle.life -=
                    0.018;


                ctx.beginPath();

                ctx.arc(
                    particle.x *
                        canvas.width,

                    particle.y *
                        canvas.height,

                    1.3,

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


    function startFireworks() {

        if (fireworksStarted) {
            return;
        }

        fireworksStarted = true;

        createFirework();

        setTimeout(
            createFirework,
            850
        );

        setTimeout(
            createFirework,
            1750
        );

        animateFireworks();
    }

});
```
