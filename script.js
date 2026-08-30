/* =====================================================
   SCREEN SYSTEM
===================================================== */

const screens =
    document.querySelectorAll(".screen");

function showScreen(id) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    setTimeout(() => {

        document
            .getElementById(id)
            .classList.add("active");

    }, 80);
}


/* =====================================================
   STAR FIELD
===================================================== */

const starField =
    document.getElementById("starField");

for (let i = 0; i < 85; i++) {

    const star =
        document.createElement("div");

    star.className = "star";

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";

    const size =
        1 + Math.random() * 2.5;

    star.style.width =
        size + "px";

    star.style.height =
        size + "px";

    star.style.animationDuration =
        2.5 + Math.random() * 5 + "s";

    star.style.animationDelay =
        Math.random() * 6 + "s";

    starField.appendChild(star);
}


/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById("bgMusic");

const musicBtn =
    document.getElementById("musicBtn");

let musicPlaying = false;

function startMusic() {

    music.volume = 0.22;

    music.play()
        .then(() => {

            musicPlaying = true;

            musicBtn.textContent = "♫";

        })
        .catch(() => {});

}

musicBtn.addEventListener("click", () => {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicBtn.textContent = "♪";

    } else {

        music.play();

        musicPlaying = true;

        musicBtn.textContent = "♫";

    }

});


/* =====================================================
   REAL DATE COUNTDOWN
   August 31 — 12:00 AM
===================================================== */

const dateCounter =
    document.getElementById("dateCounter");

const finalCountdown =
    document.getElementById("finalCountdown");

const countElement =
    document.getElementById("count");

let finalCountdownStarted = false;

function getTargetDate() {

    const now = new Date();

    let target =
        new Date(
            now.getFullYear(),
            7,
            31,
            0,
            0,
            0,
            0
        );

    /*
        If August 31 has already passed,
        use next year's August 31.
    */

    if (now >= target) {

        target =
            new Date(
                now.getFullYear() + 1,
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
    getTargetDate();


function updateDateCounter() {

    if (finalCountdownStarted)
        return;

    const now =
        new Date();

    const difference =
        targetDate - now;


    /*
        When August 31 reaches 00:00
    */

    if (difference <= 0) {

        startFinalCountdown();

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) %
                24
        );

    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) %
                60
        );

    const seconds =
        Math.floor(
            (difference /
                1000) %
                60
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateDateCounter();

setInterval(
    updateDateCounter,
    1000
);


/* =====================================================
   10 → 1 COUNTDOWN
===================================================== */

function startFinalCountdown() {

    if (finalCountdownStarted)
        return;

    finalCountdownStarted = true;

    dateCounter.classList.add("hidden");

    finalCountdown.classList.remove("hidden");

    let number = 10;

    countElement.textContent =
        number;

    startMusic();


    const timer =
        setInterval(() => {

            number--;

            if (number <= 0) {

                clearInterval(timer);

                createBurst(
                    window.innerWidth / 2,
                    window.innerHeight / 2,
                    12
                );

                showScreen("welcome");

                return;
            }

            countElement.textContent =
                number;

        }, 1000);

}


/* =====================================================
   SKIP
===================================================== */

document
    .getElementById("skipBtn")
    .addEventListener("click", () => {

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            8
        );

        showScreen("welcome");

        startMusic();

    });


/* =====================================================
   START
===================================================== */

document
    .getElementById("startBtn")
    .addEventListener("click", () => {

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            10
        );

        showScreen("boxes");

    });


/* =====================================================
   GIFT CONTENT
===================================================== */

const gifts = [

    `
        <div style="font-size:60px">✨</div>

        <h2 style="margin:12px 0">
            A little reminder
        </h2>

        <p style="color:#aaa;line-height:1.9">
            Some people have a way of making
            ordinary days feel a little more special.
        </p>
    `,

    `
        <div style="font-size:60px">💌</div>

        <h2 style="margin:12px 0">
            A tiny message
        </h2>

        <p style="color:#aaa;line-height:1.9">
            You deserve more smiles,
            beautiful memories,
            and a year full of moments
            worth remembering.
        </p>
    `,

    `
        <div style="font-size:60px">✦</div>

        <h2 style="margin:12px 0">
            Keep going...
        </h2>

        <p style="color:#aaa;line-height:1.9">
            There is still a little something
            waiting for you at the end.
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


giftBoxes.forEach(box => {

    box.addEventListener("click", () => {

        const rect =
            box.getBoundingClientRect();

        /*
            MUCH lighter burst
        */

        createBurst(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            7
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

            document
                .getElementById("boxHint")
                .textContent =
                "You've found them all ✨";

            document
                .getElementById("toMemories")
                .classList.remove("hidden");

        }

    });

});


closeModal.addEventListener(
    "click",
    () => {

        modal.classList.remove("show");

    }
);


modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            modal.classList.remove("show");

        }

    }
);


/* =====================================================
   MEMORIES
===================================================== */

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

        });

    });


document
    .getElementById("closeViewer")
    .addEventListener("click", () => {

        document
            .getElementById("imageViewer")
            .classList.remove("show");

    });


/* =====================================================
   NAVIGATION
===================================================== */

document
    .getElementById("toMemories")
    .addEventListener("click", () => {

        showScreen("memories");

    });


document
    .getElementById("toLetter")
    .addEventListener("click", () => {

        showScreen("letter");

    });


/* =====================================================
   ENVELOPE
===================================================== */

const envelope =
    document.getElementById("envelope");

envelope.addEventListener("click", () => {

    if (
        envelope.classList.contains("open")
    )
        return;


    const rect =
        envelope.getBoundingClientRect();


    createBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        8
    );


    envelope.classList.add("open");


    document
        .getElementById("openLetterHint")
        .textContent =
        "✦";


    setTimeout(() => {

        document
            .getElementById("toVideo")
            .classList.remove("hidden");

    }, 1200);

});


/* =====================================================
   VIDEO
===================================================== */

document
    .getElementById("toVideo")
    .addEventListener("click", () => {

        showScreen("videoSection");

    });


document
    .getElementById("finishBtn")
    .addEventListener("click", () => {

        showScreen("final");

        setTimeout(
            createHeartExplosion,
            350
        );

    });


/* =====================================================
   LIGHT SPARK BURST
===================================================== */

function createBurst(
    x,
    y,
    amount = 7
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

        spark.style.position =
            "fixed";

        spark.style.left =
            x + "px";

        spark.style.top =
            y + "px";

        spark.style.zIndex =
            "6000";

        spark.style.pointerEvents =
            "none";

        spark.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        spark.style.color =
            "rgba(255,255,255,.75)";

        spark.style.fontSize =
            8 + Math.random() * 8 + "px";


        const angle =
            Math.random() *
            Math.PI * 2;

        const distance =
            30 + Math.random() * 55;


        spark.animate(
            [
                {
                    transform:
                        "translate(-50%,-50%) scale(.5)",
                    opacity: 0
                },
                {
                    transform:
                        "translate(-50%,-50%) scale(1)",
                    opacity: .8,
                    offset: .2
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${Math.cos(angle) * distance}px),
                            calc(-50% + ${Math.sin(angle) * distance}px)
                        )
                        scale(.5)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    650 + Math.random() * 250,

                easing:
                    "cubic-bezier(.22,1,.36,1)"
            }
        );


        document.body.appendChild(spark);


        setTimeout(() => {

            spark.remove();

        }, 1000);

    }

}


/* =====================================================
   FINAL HEARTS
===================================================== */

function createHeartExplosion() {

    const symbols = [
        "❤️",
        "💕",
        "✨",
        "✦"
    ];


    for (let i = 0; i < 28; i++) {

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
            Math.random() * 100 + "vw";

        heart.style.top =
            100 + Math.random() * 10 + "vh";

        heart.style.fontSize =
            13 + Math.random() * 20 + "px";

        heart.style.animationDuration =
            4 + Math.random() * 3 + "s";


        document
            .getElementById("hearts")
            .appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 7500);

    }

}


/* =====================================================
   RESTART
===================================================== */

document
    .getElementById("restartBtn")
    .addEventListener("click", () => {

        location.reload();

    });
