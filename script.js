const screens = document.querySelectorAll(".screen");

function showScreen(id) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

/* ================= COUNTDOWN ================= */

let count = 5;
const countElement = document.getElementById("count");

const countdown = setInterval(() => {

    count--;

    if (count <= 0) {

        clearInterval(countdown);

        showScreen("welcome");

        startMusic();

        return;
    }

    countElement.textContent = count;

}, 1000);


/* ================= SKIP ================= */

document.getElementById("skipBtn").addEventListener("click", () => {

    showScreen("welcome");

    startMusic();

});


/* ================= START ================= */

document.getElementById("startBtn").addEventListener("click", () => {

    showScreen("boxes");

});


/* ================= MUSIC ================= */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

function startMusic() {

    music.volume = 0.25;

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


/* ================= GIFTS ================= */

const gifts = [
    `
        <div style="font-size:60px">📸</div>
        <h2>أول ذكرى</h2>
        <p style="margin-top:15px;color:#aaa;">
            كل مرة بشوف الصورة دي بفتكر قد إيه اليوم ده كان جميل.
        </p>
    `,

    `
        <div style="font-size:60px">💌</div>
        <h2>حاجة من قلبي</h2>
        <p style="margin-top:15px;color:#aaa;">
            مهما حصل ومهما الوقت عدى، في ناس وجودها بيفضل له معنى.
        </p>
    `,

    `
        <div style="font-size:60px">🎬</div>
        <h2>لسه بدري 👀</h2>
        <p style="margin-top:15px;color:#aaa;">
            الفيديو الكبير لسه مستنيكي في آخر الرحلة.
        </p>
    `
];

const giftBoxes = document.querySelectorAll(".gift-box");
const modal = document.getElementById("giftModal");
const giftContent = document.getElementById("giftContent");
const closeModal = document.querySelector(".close-modal");

let openedGifts = 0;

giftBoxes.forEach(box => {

    box.addEventListener("click", () => {

        if (!box.classList.contains("opened")) {

            box.classList.add("opened");

            openedGifts++;

        }

        const index = box.dataset.gift;

        giftContent.innerHTML = gifts[index];

        modal.classList.add("show");

        if (openedGifts === giftBoxes.length) {

            document.getElementById("boxHint").textContent =
                "خلصنا أول مرحلة ❤️";

            document
                .getElementById("toMemories")
                .classList.remove("hidden");

        }

    });

});


closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});


modal.addEventListener("click", e => {

    if (e.target === modal) {
        modal.classList.remove("show");
    }

});


/* ================= MEMORIES ================= */

document.querySelectorAll(".memory-card").forEach(card => {

    card.addEventListener("click", () => {

        const img = card.querySelector("img");

        document.getElementById("viewerImage").src = img.src;

        document
            .getElementById("imageViewer")
            .classList.add("show");

    });

});


document.getElementById("closeViewer").addEventListener("click", () => {

    document
        .getElementById("imageViewer")
        .classList.remove("show");

});


document.getElementById("toMemories").addEventListener("click", () => {

    showScreen("memories");

});


document.getElementById("toLetter").addEventListener("click", () => {

    showScreen("letter");

});


/* ================= LETTER ================= */

const envelope = document.getElementById("envelope");

envelope.addEventListener("click", () => {

    if (envelope.classList.contains("open")) return;

    envelope.classList.add("open");

    document.getElementById("openLetterHint").textContent =
        "❤️";

    setTimeout(() => {

        document
            .getElementById("toVideo")
            .classList.remove("hidden");

    }, 1200);

});


document.getElementById("toVideo").addEventListener("click", () => {

    showScreen("videoSection");

});


/* ================= VIDEO ================= */

document.getElementById("finishBtn").addEventListener("click", () => {

    showScreen("final");

    createHearts();

});


/* ================= HEARTS ================= */

function createHearts() {

    const symbols = ["❤️", "💕", "💗", "✨", "💖"];

    for (let i = 0; i < 35; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.top =
            100 + Math.random() * 20 + "vh";

        heart.style.fontSize =
            15 + Math.random() * 25 + "px";

        heart.style.animationDuration =
            3 + Math.random() * 4 + "s";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 7000);

    }

}


/* ================= RESTART ================= */

document.getElementById("restartBtn").addEventListener("click", () => {

    location.reload();

});
