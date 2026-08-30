```javascript id="9k3m1x"
const screens = document.querySelectorAll(".screen");

const countdownScreen = document.getElementById("countdown");
const welcomeScreen = document.getElementById("welcome");
const letterScreen = document.getElementById("letter");
const memoriesScreen = document.getElementById("memories");
const videoScreen = document.getElementById("videoScreen");
const finalScreen = document.getElementById("final");

const testBtn = document.getElementById("testBtn");
const openBtn = document.getElementById("openBtn");
const envelope = document.getElementById("envelope");
const tapHint = document.getElementById("tapHint");
const continueBtn = document.getElementById("continueBtn");
const videoBtn = document.getElementById("videoBtn");
const finishBtn = document.getElementById("finishBtn");

const welcomeText = document.getElementById("welcomeText");

const music = document.getElementById("music");
const birthdayVideo = document.getElementById("birthdayVideo");

const musicHint = document.getElementById("musicHint");



/* =====================================
   SCREEN NAVIGATION
===================================== */

function show(id) {

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }

}



/* =====================================
   WELCOME TYPING EFFECT
===================================== */

const welcomeMessage =
  "Tonight is all about you. I hope you're ready for a little journey through some memories... ❤️";

let typingIndex = 0;

function typeWelcome() {

  welcomeText.textContent = "";

  typingIndex = 0;

  const typing = setInterval(() => {

    welcomeText.textContent +=
      welcomeMessage.charAt(typingIndex);

    typingIndex++;

    if (typingIndex >= welcomeMessage.length) {
      clearInterval(typing);
    }

  }, 35);

}



/* =====================================
   COUNTDOWN
===================================== */

const targetDate =
  new Date("August 31, 2026 00:00:00").getTime();


function updateCountdown() {

  const now =
    new Date().getTime();

  const difference =
    targetDate - now;


  if (difference <= 0) {

    document.getElementById("days").textContent =
      "00";

    document.getElementById("hours").textContent =
      "00";

    document.getElementById("mins").textContent =
      "00";

    document.getElementById("secs").textContent =
      "00";

    showWelcome();

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
        (1000 * 60 * 60)) % 24
    );

  const mins =
    Math.floor(
      (difference /
        (1000 * 60)) % 60
    );

  const secs =
    Math.floor(
      (difference / 1000) % 60
    );


  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("mins").textContent =
    String(mins).padStart(2, "0");

  document.getElementById("secs").textContent =
    String(secs).padStart(2, "0");

}


let countdownFinished = false;


function showWelcome() {

  if (countdownFinished) {
    return;
  }

  countdownFinished = true;

  show("welcome");

  typeWelcome();

  startMusic();

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);



/* =====================================
   TEST / SKIP BUTTON
===================================== */

testBtn.addEventListener(
  "click",
  () => {

    countdownFinished = true;

    showWelcome();

    typeWelcome();

    startMusic();

  }
);



/* =====================================
   MUSIC
===================================== */

function startMusic() {

  music.volume = 0.35;

  const playPromise =
    music.play();

  if (
    playPromise !== undefined
  ) {

    playPromise.catch(() => {

      musicHint.classList.add("show");

    });

  }

}


document.addEventListener(
  "click",
  () => {

    if (
      music.paused &&
      countdownFinished
    ) {

      startMusic();

    }

  },
  { once: false }
);



/* =====================================
   WELCOME → LETTER
===================================== */

openBtn.addEventListener(
  "click",
  () => {

    show("letter");

  }
);



/* =====================================
   ENVELOPE
===================================== */

envelope.addEventListener(
  "click",
  () => {

    if (
      envelope.classList.contains("open")
    ) {
      return;
    }


    envelope.classList.add("open");

    tapHint.textContent =
      "A little message for you...";


    setTimeout(
      () => {

        continueBtn.classList.remove(
          "hidden"
        );

      },
      1000
    );

  }
);



/* =====================================
   LETTER → MEMORIES
===================================== */

continueBtn.addEventListener(
  "click",
  () => {

    show("memories");

  }
);



/* =====================================
   MEMORIES → VIDEO
===================================== */

videoBtn.addEventListener(
  "click",
  () => {

    show("videoScreen");

  }
);



/* =====================================
   VIDEO
===================================== */

birthdayVideo.addEventListener(
  "play",
  () => {

    music.pause();

  }
);


birthdayVideo.addEventListener(
  "ended",
  () => {

    music.play().catch(() => {});

  }
);



/* =====================================
   VIDEO → FINAL
===================================== */

finishBtn.addEventListener(
  "click",
  () => {

    birthdayVideo.pause();

    show("final");

    startFireworks();

  }
);



/* =====================================
   FIREWORKS
===================================== */

const canvas =
  document.getElementById("fireworks");

const ctx =
  canvas.getContext("2d");


let particles = [];

let fireworksRunning = false;


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
    Math.random() *
    canvas.width;

  const y =
    Math.random() *
    canvas.height *
    0.55;

  const particleCount = 55;


  for (
    let i = 0;
    i < particleCount;
    i++
  ) {

    const angle =
      Math.random() *
      Math.PI *
      2;

    const speed =
      Math.random() * 5 + 2;


    particles.push({

      x: x,

      y: y,

      vx:
        Math.cos(angle) *
        speed,

      vy:
        Math.sin(angle) *
        speed,

      life: 1,

      decay:
        Math.random() *
        0.018 +
        0.012,

      size:
        Math.random() *
        2 +
        1

    });

  }

}



function drawFireworks() {

  if (!fireworksRunning) {
    return;
  }


  ctx.fillStyle =
    "rgba(5, 3, 8, 0.18)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  if (
    Math.random() < 0.045
  ) {

    createFirework();

  }


  particles.forEach(
    particle => {

      particle.x +=
        particle.vx;

      particle.y +=
        particle.vy;

      particle.vy +=
        0.035;

      particle.life -=
        particle.decay;


      ctx.beginPath();

      ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        `rgba(232, 167, 192, ${particle.life})`;

      ctx.fill();

    }
  );


  particles =
    particles.filter(
      particle =>
        particle.life > 0
    );


  requestAnimationFrame(
    drawFireworks
  );

}



function startFireworks() {

  if (fireworksRunning) {
    return;
  }

  fireworksRunning = true;

  particles = [];

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  drawFireworks();

}



/* =====================================
   INITIAL STATE
===================================== */

show("countdown");
```
