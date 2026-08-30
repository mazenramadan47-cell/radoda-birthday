```javascript
document.addEventListener("DOMContentLoaded", () => {

    console.log("RADODA SCRIPT LOADED");

    /* =========================
       SCREEN SYSTEM
    ========================= */

    const screens = document.querySelectorAll(".screen");

    function showScreen(id) {
        screens.forEach(screen => {
            screen.classList.remove("active");
        });

        const screen = document.getElementById(id);

        if (screen) {
            screen.classList.add("active");
        }
    }


    /* =========================
       STARS
    ========================= */

    const stars = document.getElementById("stars");

    if (stars) {

        for (let i = 0; i < 100; i++) {

            const star = document.createElement("div");

            star.className = "star";

            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";

            star.style.animationDelay =
                Math.random() * 5 + "s";

            stars.appendChild(star);
        }
    }


    /* =========================
       SHOOTING STARS
    ========================= */

    const shootingStars =
        document.getElementById("shootingStars");

    function createShootingStar() {

        if (!shootingStars) return;

        const star =
            document.createElement("div");

        star.className = "shooting";

        star.style.left =
            70 + Math.random() * 30 + "%";

        star.style.top =
            Math.random() * 40 + "%";

        shootingStars.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 1500);
    }

    setInterval(createShootingStar, 6000);


    /* =========================
       MUSIC
    ========================= */

    const music =
        document.getElementById("music");

    const musicHint =
        document.getElementById("musicHint");

    let musicStarted = false;

    function startMusic() {

        if (!music || musicStarted) return;

        music.volume = 0.22;

        music.play()
            .then(() => {

                musicStarted = true;

                if (musicHint) {
                    musicHint.classList.add("hide");
                }

            })
            .catch(() => {
                // Browser autoplay protection.
            });
    }

    document.addEventListener(
        "click",
        startMusic
    );


    /* =========================
       COUNTDOWN
    ========================= */

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
        document.getElementById("finalCountdown");

    const finalNumber =
        document.getElementById("finalNumber");


    /*
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
            0
        );


    let countdownFinished = false;
    let tenSecondStarted = false;


    function updateCountdown() {

        if (countdownFinished) return;

        const now = new Date();

        const difference =
            targetDate.getTime() -
            now.getTime();


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
                (totalSeconds % 86400) / 3600
            );


        const m =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        const s =
            totalSeconds % 60;


        if (days)
            days.textContent =
                String(d).padStart(2, "0");

        if (hours)
            hours.textContent =
                String(h).padStart(2, "0");

        if (minutes)
            minutes.textContent =
                String(m).padStart(2, "0");

        if (seconds)
            seconds.textContent =
                String(s).padStart(2, "0");
    }


    function startTenSecondCountdown() {

        if (tenSecondStarted) return;

        tenSecondStarted = true;


        if (timer) {
            timer.style.display = "none";
        }


        if (finalCountdown) {
            finalCountdown.classList.add("show");
        }


        let number = 10;


        if (finalNumber) {
            finalNumber.textContent = number;
        }


        const interval =
            setInterval(() => {

                number--;


                if (number <= 0) {

                    clearInterval(interval);

                    countdownFinished = true;

                    showScreen("welcome");

                    startMusic();

                    return;
                }


                if (finalNumber) {
                    finalNumber.textContent =
                        number;
                }

            }, 1000);
    }


    updateCountdown();

    setInterval(
        updateCountdown,
        250
    );


    /* =========================
       SKIP BUTTON
    ========================= */

    const skipButton =
        document.getElementById(
            "skipButton"
        );


    if (skipButton) {

        skipButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                countdownFinished = true;

                showScreen("welcome");

                startMusic();
            }
        );
    }


    /* =========================
       WELCOME BUTTON
    ========================= */

    const openButton =
        document.getElementById(
            "openButton"
        );


    if (openButton) {

        openButton.addEventListener(
            "click",
            () => {

                sparkleBurst();

                showScreen("letter");
            }
        );
    }


    /* =========================
       ENVELOPE
    ========================= */

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


                envelope.classList.add(
                    "open"
                );


                if (tapHint) {
                    tapHint.textContent = "✦";
                }


                sparkleBurst();


                setTimeout(() => {

                    if (continueButton) {

                        continueButton.classList.remove(
                            "hidden"
                        );
                    }

                }, 900);
            }
        );
    }


    if (continueButton) {

        continueButton.addEventListener(
            "click",
            () => {

                showScreen("memories");

            }
        );
    }


    /* =========================
       IMAGE VIEWER
    ========================= */

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
        .forEach(photo => {

            photo.addEventListener(
                "click",
                () => {

                    const image =
                        photo.querySelector(
                            "img"
                        );

                    if (!image || !viewer) {
                        return;
                    }

                    if (viewerImage) {
                        viewerImage.src =
                            image.src;
                    }

                    viewer.classList.add(
                        "show"
                    );
                }
            );
        });


    if (closeViewer) {

        closeViewer.addEventListener(
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


    /* =========================
       VIDEO
    ========================= */

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

                showScreen("final");

                setTimeout(
                    startFireworks,
                    200
                );
            }
        );
    }


    /* =========================
       SPARKLE BURST
    ========================= */

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


        for (
            let i = 0;
            i < 8;
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
                "99999";

            particle.style.pointerEvents =
                "none";

            particle.style.color =
                "rgba(255,255,255,.8)";

            particle.style.fontSize =
                "11px";


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

                        opacity: .8
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
                () => particle.remove(),
                800
            );
        }
    }


    /* =========================
       FIREWORKS
    ========================= */

    const canvas =
        document.getElementById(
            "fireworks"
        );


    let ctx = null;


    if (canvas) {

        ctx =
            canvas.getContext("2d");

    }


    let particles = [];

    let fireworksRunning = false;


    function resizeCanvas() {

        if (!canvas) return;

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

        if (!canvas || !ctx) return;


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

        if (!canvas || !ctx) {
            return;
        }


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

        if (
            fireworksRunning ||
            !canvas
        ) {
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
