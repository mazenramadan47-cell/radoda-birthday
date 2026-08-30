```javascript
/* =========================================================
   RADODA BIRTHDAY WEBSITE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       SCREEN NAVIGATION
       ===================================================== */

    const allScreens =
        document.querySelectorAll(".screen");


    function show(id) {

        allScreens.forEach(function (screen) {

            screen.classList.remove("active");

        });


        const target =
            document.getElementById(id);


        if (target) {

            target.classList.add("active");

        }
    }


    /* =====================================================
       BACKGROUND STARS
       ===================================================== */

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


        star.style.animationDelay =
            Math.random() * 5 + "s";


        star.style.animationDuration =
            3 + Math.random() * 5 + "s";


        stars.appendChild(star);

    }


    /* =====================================================
       SHOOTING STARS
       ===================================================== */

    function shootingStar() {

        const container =
            document.getElementById(
                "shootingStars"
            );


        const star =
            document.createElement("div");


        star.className =
            "shooting";


        star.style.left =
            (70 + Math.random() * 30) + "%";


        star.style.top =
            Math.random() * 40 + "%";


        container.appendChild(star);


        setTimeout(function () {

            star.remove();

        }, 1500);

    }


    setInterval(
        shootingStar,
        6500
    );


    /* =====================================================
       MUSIC
       ===================================================== */

    const music =
        document.getElementById("music");


    const musicHint =
        document.getElementById(
            "musicHint"
        );


    const musicButton =
        document.getElementById(
            "musicButton"
        );


    function startMusic() {

        if (!music) return;


        music.volume = 0.2;


        music.play()
            .then(function () {

                musicHint.classList.add(
                    "hide"
                );

                musicButton.textContent =
                    "♫";

            })
            .catch(function () {

                // Browser autoplay protection.

            });

    }


    document.addEventListener(
        "click",
        startMusic,
        { once: true }
    );


    musicButton.addEventListener(
        "click",
        function (event) {

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


    /* =====================================================
       COUNTDOWN
       ===================================================== */

    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");


    const normalTimer =
        document.getElementById(
            "normalTimer"
        );


    const tenCountdown =
        document.getElementById(
            "tenCountdown"
        );


    const tenNumber =
        document.getElementById(
            "tenNumber"
        );


    /*
       IMPORTANT:

       JavaScript months start at 0.

       7 = August.

       2026, 7, 31, 0, 0, 0
       =
       August 31 2026 at 12:00 AM.
    */

    const target =
        new Date(
            2026,
            7,
            31,
            0,
            0,
            0,
            0
        );


    let tenCountdownStarted =
        false;


    let websiteOpened =
        false;


    function updateCountdown() {

        if (websiteOpened) {
            return;
        }


        const now =
            new Date();


        const difference =
            target.getTime()
            -
            now.getTime();


        /*
           Midnight reached.
        */

        if (difference <= 0) {

            startTenCountdown();

            return;

        }


        const total =
            Math.floor(
                difference / 1000
            );


        const d =
            Math.floor(
                total / 86400
            );


        const h =
            Math.floor(
                (total % 86400) / 3600
            );


        const m =
            Math.floor(
                (total % 3600) / 60
            );


        const s =
            total % 60;


        days.textContent =
            String(d).padStart(2, "0");


        hours.textContent =
            String(h).padStart(2, "0");


        minutes.textContent =
            String(m).padStart(2, "0");


        seconds.textContent =
            String(s).padStart(2, "0");

    }


    /* =====================================================
       10 → 1
       ===================================================== */

    function startTenCountdown() {

        if (tenCountdownStarted) {
            return;
        }


        tenCountdownStarted = true;


        normalTimer.style.display =
            "none";


        tenCountdown.classList.add(
            "show"
        );


        let number = 10;


        tenNumber.textContent =
            number;


        const interval =
            setInterval(function () {

                number--;


                if (number <= 0) {

                    clearInterval(
                        interval
                    );


                    websiteOpened =
                        true;


                    show("welcome");


                    startMusic();


                    return;

                }


                tenNumber.textContent =
                    number;


            }, 1000);

    }


    /*
       Run immediately.
    */

    updateCountdown();


    /*
       Check four times per second.
       This makes midnight detection reliable.
    */

    setInterval(
        updateCountdown,
        250
    );


    /* =====================================================
       SKIP BUTTON
       ===================================================== */

    const skipButton =
        document.getElementById(
            "skipButton"
        );


    skipButton.addEventListener(
        "click",
        function (event) {

            /*
               Prevent anything else
               from handling this click.
            */

            event.preventDefault();
            event.stopPropagation();


            websiteOpened =
                true;


            startMusic();


            show("welcome");

        }
    );


    /* =====================================================
       WELCOME → LETTER
       ===================================================== */

    const openButton =
        document.getElementById(
            "openButton"
        );


    openButton.addEventListener(
        "click",
        function () {

            sparkleBurst();

            show("letter");

        }
    );


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


    const continueButton =
        document.getElementById(
            "continueButton"
        );


    envelope.addEventListener(
        "click",
        function () {

            if (
                envelope.classList.contains(
                    "open"
                )
            ) {
                return;
            }


            envelope.classList.add(
                "open"
            );


            tapHint.textContent =
                "✦";


            sparkleBurst();


            setTimeout(
                function () {

                    continueButton.classList.remove(
                        "hidden"
                    );

                },
                1000
            );

        }
    );


    continueButton.addEventListener(
        "click",
        function () {

            show("memories");

        }
    );


    /* =====================================================
       IMAGE VIEWER
       ===================================================== */

    const viewer =
        document.getElementById(
            "viewer"
        );


    const viewerImage =
        document.getElementById(
            "viewerImage"
        );


    const closeViewer =
        document.getElementById(
            "closeViewer"
        );


    document
        .querySelectorAll(".photo")
        .forEach(function (photo) {

            photo.addEventListener(
                "click",
                function () {

                    const image =
                        photo.querySelector(
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


    closeViewer.addEventListener(
        "click",
        function () {

            viewer.classList.remove(
                "show"
            );

        }
    );


    viewer.addEventListener(
        "click",
        function (event) {

            if (
                event.target === viewer
            ) {

                viewer.classList.remove(
                    "show"
                );

            }

        }
    );


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


    videoButton.addEventListener(
        "click",
        function () {

            show("video");

        }
    );


    finishButton.addEventListener(
        "click",
        function () {

            show("final");


            setTimeout(
                startFireworks,
                200
            );

        }
    );


    /* =====================================================
       SMALL SPARKLE BURST
       ===================================================== */

    function sparkleBurst() {

        const symbols = [
            "✦",
            "✧",
            "⋆"
        ];


        const x =
            window.innerWidth / 2;


        const y =
            window.innerHeight / 2;


        for (let i = 0; i < 8; i++) {

            const particle =
                document.createElement("div");


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
                "10px";


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
                            "translate(-50%,-50%) scale(.3)",

                        opacity: 0
                    },

                    {
                        transform:
                            "translate(-50%,-50%) scale(1)",

                        opacity: .8
                    },

                    {
                        transform:
                            "translate(" +
                            (
                                Math.cos(angle) *
                                distance
                            ) +
                            "px," +
                            (
                                Math.sin(angle) *
                                distance
                            ) +
                            "px) scale(.3)",

                        opacity: 0
                    }
                ],

                {
                    duration: 700,

                    easing:
                        "cubic-bezier(.22,1,.36,1)"
                }

            );


            document.body.appendChild(
                particle
            );


            setTimeout(
                function () {

                    particle.remove();

                },
                800
            );

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


    function createFirework() {

        const x =
            0.15 +
            Math.random() *
            0.7;


        const y =
            0.15 +
            Math.random() *
            0.4;


        for (let i = 0; i < 24; i++) {

            const angle =
                (
                    Math.PI * 2 * i
                ) / 24;


            const speed =
                0.006 +
                Math.random() *
                0.006;


            particles.push({

                x: x,

                y: y,

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
                function (particle) {

                    return particle.life > 0;

                }
            );


        particles.forEach(
            function (particle) {

                particle.x +=
                    particle.vx;


                particle.y +=
                    particle.vy;


                particle.vy +=
                    0.0001;


                particle.life -=
                    0.018;


                ctx.beginPath();


                ctx.arc(
                    particle.x *
                        canvas.width,

                    particle.y *
                        canvas.height,

                    1.2,

                    0,

                    Math.PI * 2
                );


                ctx.fillStyle =
                    "rgba(255,170,200," +
                    particle.life +
                    ")";


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
            1700
        );


        animateFireworks();

    }

});
```
