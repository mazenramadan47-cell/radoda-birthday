/* =========================================================
   GLOBAL
========================================================= */

const screens = document.querySelectorAll(".screen");

function showScreen(id) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(id);

    setTimeout(() => {
        target.classList.add("active");
    }, 80);

}


/* =========================================================
   BACKGROUND PARTICLES
========================================================= */

const particleContainer =
    document.getElementById("particles");

for (let i = 0; i < 55; i++) {

    const particle =
        document.createElement("div");

    particle.className = "particle";

    particle.style.left =
        Math.random() * 100 + "vw";

    particle.style.animationDuration =
        7 + Math.random() * 12 + "s";

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    particle.style.opacity =
        .15 + Math.random() * .6;

    const size =
        1 + Math.random() * 3;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particleContainer.appendChild(particle);

}


/* =========================================================
   COUNTDOWN
========================================================= */

let count = 5;

const countElement =
    document.getElementById("count");

const countdown =
    setInterval(() => {

        count--;

        if (count <= 0) {

            clearInterval(countdown);

            createBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                35
            );

            showScreen("welcome");

            startMusic();

            return;

        }

        countElement.textContent = count;

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            8
        );

    }, 1000);


/* =========================================================
   SKIP
========================================================= */

document
    .getElementById("skipBtn")
    .addEventListener("click", () => {

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            40
        );

        showScreen("welcome");

        startMusic();

    });


/* =========================================================
   START
========================================================= */

document
    .getElementById("startBtn")
    .addEventListener("click", () => {

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            50
        );

        showScreen("boxes");

    });


/* =========================================================
   MUSIC
========================================================= */

const music =
    document.getElementById("bgMusic");

const musicBtn =
    document.getElementById("musicBtn");

let musicPlaying = false;

function startMusic() {

    music.volume = .25;

    music.play()
        .then(() => {

            musicPlaying = true;

            musicBtn.textContent = "🔊";

        })
        .catch(() => {});

}

musicBtn.addEventListener("click", () => {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicBtn.textContent = "🔇";

    } else {

        music.play();

        musicPlaying = true;

        musicBtn.textContent = "🔊";

    }

});


/* =========================================================
   GIFT CONTENT
========================================================= */

const gifts = [

    `
        <div style="font-size:65px">✨</div>

        <h2 style="margin:15px 0">
            A little reminder
        </h2>

        <p style="color:#aaa;line-height:2">
            No matter how ordinary a day feels,
            sometimes one person can make it
            feel completely different.
        </p>
    `,

    `
        <div style="font-size:65px">💌</div>

        <h2 style="margin:15px 0">
            A tiny message
        </h2>

        <p style="color:#aaa;line-height:2">
            You deserve more smiles,
            more beautiful memories,
            and a year full of moments
            you'll never forget.
        </p>
    `,

    `
        <div style="font-size:65px">🌟</div>

        <h2 style="margin:15px 0">
            There's more...
        </h2>

        <p style="color:#aaa;line-height:2">
            Keep going.
            The best part of the surprise
            is still waiting for you.
        </p>
    `

];


const giftBoxes =
    document.querySelectorAll(".gift-box");

const modal =
    document.getElementById("giftModal");

const giftContent =
    document.getElementById("giftContent");

const closeModal =
    document.querySelector(".close-modal");

let openedGifts = 0;


/* =========================================================
   GIFT CLICK
========================================================= */

giftBoxes.forEach(box => {

    box.addEventListener("click", event => {

        const rect =
            box.getBoundingClientRect();

        createBurst(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            30
        );

        if (!box.classList.contains("opened")) {

            box.classList.add("opened");

            openedGifts++;

        }

        const index =
            box.dataset.gift;

        giftContent.innerHTML =
            gifts[index];

        modal.classList.add("show");

        if (openedGifts === giftBoxes.length) {

            document.getElementById("boxHint")
                .textContent =
                "You've found them all ✨";

            document
                .getElementById("toMemories")
                .classList.remove("hidden");

        }

    });

});


/* =========================================================
   CLOSE MODAL
========================================================= */

closeModal.addEventListener("click", () => {

    modal.classList.remove("show");

});


modal.addEventListener("click", event => {

    if (event.target === modal) {

        modal.classList.remove("show");

    }

});


/* =========================================================
   MEMORIES
========================================================= */

document
    .querySelectorAll(".memory-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const img =
                card.querySelector("img");

            document
                .getElementById("viewerImage")
                .src = img.src;

            document
                .getElementById("imageViewer")
                .classList.add("show");

            createBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                25
            );

        });

    });


document
    .getElementById("closeViewer")
    .addEventListener("click", () => {

        document
            .getElementById("imageViewer")
            .classList.remove("show");

    });


/* =========================================================
   NAVIGATION
========================================================= */

document
    .getElementById("toMemories")
    .addEventListener("click", () => {

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            25
        );

        showScreen("memories");

    });


document
    .getElementById("toLetter")
    .addEventListener("click", () => {

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            25
        );

        showScreen("letter");

    });


/* =========================================================
   ENVELOPE
========================================================= */

const envelope =
    document.getElementById("envelope");

envelope.addEventListener("click", () => {

    if (envelope.classList.contains("open"))
        return;

    const rect =
        envelope.getBoundingClientRect();

    createBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        45
    );

    envelope.classList.add("open");

    document
        .getElementById("openLetterHint")
        .textContent =
        "✨";

    setTimeout(() => {

        document
            .getElementById("toVideo")
            .classList.remove("hidden");

    }, 1200);

});


/* =========================================================
   VIDEO
========================================================= */

document
    .getElementById("toVideo")
    .addEventListener("click", () => {

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            30
        );

        showScreen("videoSection");

    });


document
    .getElementById("finishBtn")
    .addEventListener("click", () => {

        showScreen("final");

        setTimeout(() => {

            createHeartExplosion();

        }, 400);

    });


/* =========================================================
   SPARK BURST
========================================================= */

function createBurst(x, y, amount = 20) {

    const symbols = [
        "✦",
        "✧",
        "✶",
        "⋆",
        "•"
    ];

    for (let i = 0; i < amount; i++) {

        const spark =
            document.createElement("div");

        spark.className = "spark";

        spark.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        spark.style.left = x + "px";
        spark.style.top = y + "px";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            50 + Math.random() * 130;

        spark.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        spark.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        spark.style.fontSize =
            10 + Math.random() * 18 + "px";

        document.body.appendChild(spark);

        setTimeout(() => {
            spark.remove();
        }, 1000);

    }

}


/* =========================================================
   FINAL HEART EXPLOSION
========================================================= */

function createHeartExplosion() {

    const symbols = [
        "❤️",
        "💕",
        "💗",
        "✨",
        "💖",
        "✦"
    ];

    for (let i = 0; i < 45; i++) {

        const heart =
            document.createElement("div");

        heart.className = "heart";

        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.top =
            100 + Math.random() * 10 + "vh";

        heart.style.fontSize =
            14 + Math.random() * 28 + "px";

        heart.style.animationDuration =
            3 + Math.random() * 4 + "s";

        document
            .getElementById("hearts")
            .appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 7500);

    }

}


/* =========================================================
   RESTART
========================================================= */

document
    .getElementById("restartBtn")
    .addEventListener("click", () => {

        location.reload();

    });
