```javascript
document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       SCREEN NAVIGATION
       ===================================================== */

    const screens =
        document.querySelectorAll(".screen");


    function showScreen(id) {

        screens.forEach(function (screen) {
            screen.classList.remove("active");
        });


        const target =
            document.getElementById(id);


        if (target) {
            target.classList.add("active");
        }

    }


    /* =====================================================
       STARS
       ===================================================== */

    const starsContainer =
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


        starsContainer.appendChild(star);

    }


    /* =====================================================
       SHOOTING STARS
       ===================================================== */

    const shootingContainer =
        document.getElementById(
            "shootingStars"
        );


    function createShootingStar() {

        const star =
            document.createElement("div");


        star.className = "shooting";


        star.style.left =
            70 + Math.random() * 30 + "%";


        star.style.top =
            Math.random() * 40 + "%";


        shootingContainer.appendChild(star);


        setTimeout(function () {

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
        document.getElementById(
            "musicHint"
        );


    let musicStarted = false;


    function startMusic() {

        if (!music || musicStarted) {
            return;
        }


        music.volume = 0.22;


        music.play()
            .then(function () {

                musicStarted = true;

                musicHint.classList.add(
                    "hide"
                );

            })
            .catch(function () {

                /*
                   Browser blocked autoplay.
                   The next click will try again.
                */

            });

    }


    document.addEventListener(
        "click",
        startMusic
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


    const timer =
        document.getElementById("timer");


    const finalCountdown =
        document.getElementById(
            "finalCountdown"
        );


    const finalNumber =
        document.getElementById(
            "finalNumber"
        );


    /*
       AUGUST = 7
       because JavaScript months
       start from zero.

       Target:
       August 31, 2026
       12:00 AM
    */

    const targetDate =
        new Date(
            2026,
            7,
            31,
            0,
            0,
            0,
            0
        );


    let countdownEnded = false;

    let tenSecondRunning = false;


    function updateCountdown() {

        if (countdownEnded) {
            return;
        }


        const now =
            new Date();


        const difference =
            targetDate.getTime()
            -
            now.getTime();


        /*
           MIDNIGHT
        */

        if (difference <= 0) {

            startTenSecondCountdown();

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
            String(d).padStart(
                2,
                "0"
            );


        hours.textContent =
            String(h).padStart(
                2,
                "0"
            );


        minutes.textContent =
            String(m).padStart(
                2,
                "0"
            );


        seconds.textContent =
            String(s).padStart(
                2,
                "0"
            );

    }


    function startTenSecondCountdown() {

        if (tenSecondRunning) {
            return;
        }


        tenSecondRunning = true;


        timer.style.display =
            "none";


        finalCountdown.classList.add(
            "show"
        );


        let number = 10;


        finalNumber.textContent =
            number;


        const interval =
            setInterval(function () {

                number--;


                if (number <= 0) {

                    clearInterval(
                        interval
                    );


                    countdownEnded =
                        true;


                    showScreen(
                        "welcome"
                    );


                    startMusic();


                    return;

                }


                finalNumber.textContent =
                    number;


            }, 1000);

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        250
    );


    /* =====================================================
       SKIP
       ===================================================== */

    const skipButton =
        document.getElementById(
            "skipButton"
        );


    skipButton.onclick =
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            countdownEnded =
                true;


            showScreen(
                "welcome"
            );


            startMusic();

        };


    /* =====================================================
       WELCOME
       ===================================================== */

    const openButton =
        document.getElementById(
            "openButton"
        );


    openButton.onclick =
        function () {

            sparkleBurst();

            showScreen(
                "letter"
            );

        };


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


    envelope.onclick =
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
                900
            );

        };


    continueButton.onclick =
        function () {

            showScreen(
                "memories"
            );

        };


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

            photo.onclick =
                function () {

                    const img =
                        photo.querySelector(
                            "img"
                        );


                    viewerImage.src =
                        img.src;


                    viewer.classList.add(
                        "show"
                    );

                };

        });


    closeViewer.onclick =
        function () {

            viewer.classList.remove(
                "show"
            );

        };


    viewer.onclick =
        function (event) {

            if (
                event.target === viewer
            ) {

                viewer.classList.remove(
                    "show"
                );

            }

        };


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


    videoButton.onclick =
        function () {

            showScreen(
                "videoScreen"
            );

        };


    finishButton.onclick =
        function () {

            showScreen(
                "final"
            );


            setTimeout(
                startFireworks,
                200
            );

        };


    /* =====================================================
       SPARKLE BURST
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
                "9999";


            particle.style.pointerEvents =
                "none";


            particle.style.color =
                "rgba(255,255,255,.75)";


            particle.style.fontSize =
                "10px";


            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                25 +
                Math.random() *
                40;


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

                        opacity: .75
                    },

                    {
                        transform:
                            "translate(" +
                            Math.cos(angle) *
                            distance +
                            "px," +
                            Math.sin(angle) *
                            distance +
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
       FIREWORKS
       ===================================================== */

    const canvas =
        document.getElementById(
            "fireworks"
        );


    const ctx =
        canvas.getContext("2d");


    let particles = [];


    let fireworksRunning =
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
                .006 +
                Math.random() *
                .006;


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
                    .0001;


                particle.life -=
                    .018;


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

        if (fireworksRunning) {
            return;
        }


        fireworksRunning = true;


        createFirework();


        setTimeout(
            createFirework,
            800
        );


        setTimeout(
            createFirework,
            1600
        );


        animateFireworks();

    }

});
```
