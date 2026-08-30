/* =========================================================
   RADODA BIRTHDAY WEBSITE
   FINAL SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SCREEN NAVIGATION
    ===================================================== */

    const screens = document.querySelectorAll(".screen");

    function showScreen(id) {

        screens.forEach(screen => {
            screen.classList.remove("active");
        });

        const target = document.getElementById(id);

        if (!target) {
            console.error("Screen not found:", id);
            return;
        }

        requestAnimationFrame(() => {
            target.classList.add("active");
        });
    }


    /* =====================================================
       BACKGROUND STARS
    ===================================================== */

    const stars = document.getElementById("stars");

    if (stars) {

        for (let i = 0; i < 80; i++) {

            const star = document.createElement("span");

            star.className = "star";

            star.style.left =
                Math.random() * 100 + "vw";

            star.style.top =
                Math.random() * 100 + "vh";

            star.style.animationDelay =
                Math.random() * 5 + "s";

            star.style.animationDuration =
                3 + Math.random() * 5 + "s";

            const size =
                1 + Math.random() * 2.5;

            star.style.width = size + "px";
            star.style.height = size + "px";

            stars.appendChild(star);
        }
    }


    /* =====================================================
       FLOATING PARTICLES
    ===================================================== */

    const particleContainer =
        document.getElementById("particles");

    if (particleContainer) {

        for (let i = 0; i < 30; i++) {

            const particle =
                document.createElement("span");

            particle.className = "particle";

            particle.style.left =
                Math.random() * 100 + "vw";

            particle.style.animationDelay =
                Math.random() * 10 + "s";

            particle.style.animationDuration =
                8 + Math.random() * 12 + "s";

            particleContainer.appendChild(particle);
        }
    }


    /* =====================================================
       SHOOTING STARS
    ===================================================== */

    const shootingContainer =
        document.getElementById("shootingStars");

    function createShootingStar() {

        if (!shootingContainer) return;

        const star =
            document.createElement("span");

        star.className = "shooting-star";

        star.style.left =
            65 + Math.random() * 30 + "vw";

        star.style.top =
            Math.random() * 35 + "vh";

        shootingContainer.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 1400);
    }

    setInterval(createShootingStar, 6500);


    /* =====================================================
       MUSIC
    ===================================================== */

    const music =
        document.getElementById("bgMusic");

    const musicBtn =
        document.getElementById("musicBtn");

    function startMusic() {

        if (!music) return;

        music.volume = 0.22;

        music.play()
            .then(() => {

                if (musicBtn) {
                    musicBtn.textContent = "♫";
                }

            })
            .catch(() => {
                console.log("Music waiting for user interaction.");
            });
    }


    if (musicBtn) {

        musicBtn.addEventListener("click", event => {

            event.stopPropagation();

            if (!music) return;

            if (music.paused) {

                music.volume = 0.22;

                music.play()
                    .then(() => {

                        musicBtn.textContent = "♫";

                    })
                    .catch(() => {});

            } else {

                music.pause();

                musicBtn.textContent = "♪";
            }

        });
    }


    /* =====================================================
       COUNTDOWN
       31 AUGUST 2026 - 12:00 AM
    ===================================================== */

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");

    const timerElement =
        document.querySelector(".timer");

    const tenCountdown =
        document.getElementById("tenCountdown");

    const countElement =
        document.getElementById("count");

    const skipBtn =
        document.getElementById("skipBtn");


    /*
       JavaScript months start from 0.

       7 = August

       Target:
       31 August 2026
       00:00:00
    */

    const target =
        new Date(2026, 7, 31, 0, 0, 0, 0);


    let countdownFinished = false;
    let tenStarted = false;


    function updateCountdown() {

        if (countdownFinished || tenStarted) {
            return;
        }

        const now = new Date();

        const difference =
            target.getTime() - now.getTime();


        /* =================================================
           TARGET REACHED
        ================================================= */

        if (difference <= 0) {

            startTenCountdown();

            return;
        }


        const totalSeconds =
            Math.floor(difference / 1000);


        const days =
            Math.floor(
                totalSeconds / 86400
            );


        const hours =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );


        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        const seconds =
            totalSeconds % 60;


        if (daysElement) {
            daysElement.textContent =
                String(days).padStart(2, "0");
        }


        if (hoursElement) {
            hoursElement.textContent =
                String(hours).padStart(2, "0");
        }


        if (minutesElement) {
            minutesElement.textContent =
                String(minutes).padStart(2, "0");
        }


        if (secondsElement) {
            secondsElement.textContent =
                String(seconds).padStart(2, "0");
        }
    }


    /* =====================================================
       10 → 1
    ===================================================== */

    function startTenCountdown() {

        if (tenStarted) return;

        tenStarted = true;


        if (timerElement) {
            timerElement.classList.add("hide");
        }


        if (skipBtn) {
            skipBtn.classList.add("hidden");
        }


        if (tenCountdown) {
            tenCountdown.classList.add("show");
        }


        let number = 10;


        if (countElement) {
            countElement.textContent = number;
        }


        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            10
        );


        const interval =
            setInterval(() => {

                number--;


                if (number <= 0) {

                    clearInterval(interval);

                    countdownFinished = true;

                    if (tenCountdown) {
                        tenCountdown.classList.remove("show");
                    }

                    showScreen("welcome");

                    startMusic();

                    createBurst(
                        window.innerWidth / 2,
                        window.innerHeight / 2,
                        16
                    );

                    return;
                }


                if (countElement) {
                    countElement.textContent = number;
                }


                createBurst(
                    window.innerWidth / 2,
                    window.innerHeight / 2,
                    5
                );

            }, 1000);
    }


    updateCountdown();

    setInterval(updateCountdown, 250);


    /* =====================================================
       SKIP COUNTDOWN
    ===================================================== */

    if (skipBtn) {

        skipBtn.addEventListener("click", event => {

            event.preventDefault();
            event.stopPropagation();

            countdownFinished = true;
            tenStarted = true;

            if (timerElement) {
                timerElement.classList.add("hide");
            }

            startMusic();

            createBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                12
            );

            showScreen("welcome");

        });
    }


    /* =====================================================
       WELCOME
    ===================================================== */

    const startBtn =
        document.getElementById("startBtn");


    if (startBtn) {

        startBtn.addEventListener("click", () => {

            createBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                10
            );

            showScreen("boxes");

        });
    }


    /* =====================================================
       GIFTS
    ===================================================== */

    const gifts = [

        `
            <div class="gift-modal-icon">🎁</div>

            <h2>A little reminder</h2>

            <p>
                No matter how ordinary a day feels,
                sometimes one person can make it
                feel completely different.
            </p>
        `,

        `
            <div class="gift-modal-icon">💌</div>

            <h2>A tiny message</h2>

            <p>
                You deserve more smiles,
                more beautiful memories,
                and a year full of moments
                you'll never forget.
            </p>
        `,

        `
            <div class="gift-modal-icon">✨</div>

            <h2>Keep going...</h2>

            <p>
                The best part of the surprise
                is still waiting for you.
            </p>
        `
    ];


    const giftBoxes =
        document.querySelectorAll(".gift-box");

    const giftModal =
        document.getElementById("giftModal");

    const giftContent =
        document.getElementById("giftContent");

    const closeModal =
        document.querySelector(".close-modal");

    let openedGifts = 0;


    giftBoxes.forEach(box => {

        box.addEventListener("click", () => {

            const rect =
                box.getBoundingClientRect();

            createBurst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                8
            );


            if (!box.classList.contains("opened")) {

                box.classList.add("opened");

                openedGifts++;
            }


            const index =
                Number(box.dataset.gift);


            if (
                giftContent &&
                gifts[index]
            ) {

                giftContent.innerHTML =
                    gifts[index];
            }


            if (giftModal) {
                giftModal.classList.add("show");
            }


            if (
                openedGifts ===
                giftBoxes.length
            ) {

                const hint =
                    document.getElementById("boxHint");

                const next =
                    document.getElementById("toMemories");


                if (hint) {
                    hint.textContent =
                        "You've found them all ✨";
                }


                if (next) {
                    next.classList.remove("hidden");
                }
            }

        });

    });


    /* =====================================================
       CLOSE GIFT MODAL
    ===================================================== */

    if (closeModal) {

        closeModal.addEventListener("click", () => {

            if (giftModal) {
                giftModal.classList.remove("show");
            }

        });

    }


    if (giftModal) {

        giftModal.addEventListener("click", event => {

            if (event.target === giftModal) {

                giftModal.classList.remove("show");

            }

        });

    }


    /* =====================================================
       MEMORIES / IMAGES
    ===================================================== */

    const viewer =
        document.getElementById("imageViewer");

    const viewerImage =
        document.getElementById("viewerImage");

    const closeViewer =
        document.getElementById("closeViewer");


    const memoryCards =
        document.querySelectorAll(".memory-card");


    memoryCards.forEach(card => {

        const img =
            card.querySelector("img");


        /* Image error detection */

        if (img) {

            img.addEventListener("error", () => {

                console.error(
                    "Image failed to load:",
                    img.getAttribute("src")
                );

                card.classList.add("image-error");

            });

            img.addEventListener("load", () => {

                card.classList.add("image-loaded");

            });

        }


        card.addEventListener("click", () => {

            if (!img || !viewer || !viewerImage) {
                return;
            }


            /*
               Use the exact current image source.
               This works correctly on GitHub Pages.
            */

            viewerImage.src =
                img.currentSrc ||
                img.src;


            viewer.classList.add("show");


            createBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                7
            );

        });

    });


    /* =====================================================
       CLOSE IMAGE VIEWER
    ===================================================== */

    if (closeViewer) {

        closeViewer.addEventListener("click", () => {

            if (viewer) {
                viewer.classList.remove("show");
            }

        });

    }


    if (viewer) {

        viewer.addEventListener("click", event => {

            if (event.target === viewer) {

                viewer.classList.remove("show");

            }

        });

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    const toMemories =
        document.getElementById("toMemories");

    const toLetter =
        document.getElementById("toLetter");


    if (toMemories) {

        toMemories.addEventListener("click", () => {

            createBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                8
            );

            showScreen("memories");

        });

    }


    if (toLetter) {

        toLetter.addEventListener("click", () => {

            createBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                8
            );

            showScreen("letter");

        });

    }


    /* =====================================================
       ENVELOPE
    ===================================================== */

    const envelope =
        document.getElementById("envelope");

    const openLetterHint =
        document.getElementById("openLetterHint");

    const toVideo =
        document.getElementById("toVideo");


    if (envelope) {

        envelope.addEventListener("click", () => {

            if (
                envelope.classList.contains("open")
            ) {
                return;
            }


            const rect =
                envelope.getBoundingClientRect();


            createBurst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                8
            );


            envelope.classList.add("open");


            if (openLetterHint) {

                openLetterHint.textContent =
                    "✦";

            }


            setTimeout(() => {

                if (toVideo) {

                    toVideo.classList.remove(
                        "hidden"
                    );

                }

            }, 1000);

        });

    }


    /* =====================================================
       VIDEO
    ===================================================== */

    const mainVideo =
        document.getElementById("mainVideo");


    if (mainVideo) {

        mainVideo.addEventListener(
            "error",
            () => {

                console.error(
                    "Video failed to load. Check birthday.mp4 filename."
                );

            }
        );

    }


    if (toVideo) {

        toVideo.addEventListener("click", () => {

            createBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                8
            );

            showScreen("videoSection");

        });

    }


    /* =====================================================
       FINISH
    ===================================================== */

    const finishBtn =
        document.getElementById("finishBtn");


    if (finishBtn) {

        finishBtn.addEventListener("click", () => {

            showScreen("final");


            setTimeout(() => {

                createHeartExplosion();

            }, 300);

        });

    }


    /* =====================================================
       SPARK BURST
    ===================================================== */

    function createBurst(
        x,
        y,
        amount = 8
    ) {

        const symbols = [
            "✦",
            "✧",
            "⋆"
        ];


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const spark =
                document.createElement("div");


            spark.className =
                "spark";


            spark.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            spark.style.left =
                x + "px";

            spark.style.top =
                y + "px";


            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                25 +
                Math.random() *
                70;


            spark.style.setProperty(
                "--x",
                Math.cos(angle) *
                distance +
                "px"
            );


            spark.style.setProperty(
                "--y",
                Math.sin(angle) *
                distance +
                "px"
            );


            spark.style.fontSize =
                8 +
                Math.random() *
                10 +
                "px";


            document.body.appendChild(
                spark
            );


            setTimeout(() => {

                spark.remove();

            }, 750);

        }

    }


    /* =====================================================
       FINAL HEARTS
    ===================================================== */

    function createHeartExplosion() {

        const container =
            document.getElementById("hearts");


        if (!container) return;


        const symbols = [
            "❤️",
            "💕",
            "💗",
            "✨",
            "✦"
        ];


        for (
            let i = 0;
            i < 24;
            i++
        ) {

            const heart =
                document.createElement("div");


            heart.className =
                "heart";


            heart.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            heart.style.left =
                Math.random() *
                100 +
                "vw";


            heart.style.top =
                100 +
                Math.random() *
                10 +
                "vh";


            heart.style.fontSize =
                12 +
                Math.random() *
                18 +
                "px";


            heart.style.animationDuration =
                4 +
                Math.random() *
                3 +
                "s";


            container.appendChild(
                heart
            );


            setTimeout(() => {

                heart.remove();

            }, 7500);

        }

    }


    /* =====================================================
       RESTART
    ===================================================== */

    const restartBtn =
        document.getElementById("restartBtn");


    if (restartBtn) {

        restartBtn.addEventListener("click", () => {

            window.location.reload();

        });

    }

});
