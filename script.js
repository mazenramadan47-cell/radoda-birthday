```javascript
/* =====================================
   ELEMENTS
===================================== */

const screens =
  document.querySelectorAll(".screen");

const welcomeText =
  document.getElementById("welcomeText");

const envelope =
  document.getElementById("envelope");

const tapHint =
  document.getElementById("tapHint");

const continueBtn =
  document.getElementById("continueBtn");

const birthdayVideo =
  document.getElementById("birthdayVideo");

const music =
  document.getElementById("music");

const musicHint =
  document.getElementById("musicHint");



/* =====================================
   SHOW SCREEN
===================================== */

function show(id) {

  screens.forEach(
    screen => {

      screen.classList.remove(
        "active"
      );

    }
  );


  const target =
    document.getElementById(id);


  if (target) {

    target.classList.add(
      "active"
    );

  }

}



/* =====================================
   WELCOME TEXT
===================================== */

const welcomeMessage =
  "Tonight is all about you. I hope you're ready for a little journey through some memories... ❤️";


function typeWelcome() {

  welcomeText.textContent = "";

  let index = 0;


  const typing =
    setInterval(
      () => {

        welcomeText.textContent +=
          welcomeMessage.charAt(index);

        index++;


        if (
          index >= welcomeMessage.length
        ) {

          clearInterval(typing);

        }

      },
      35
    );

}



/* =====================================
   COUNTDOWN
===================================== */

const targetDate =
  new Date(
    "August 31, 2026 00:00:00"
  ).getTime();


let countdownFinished =
  false;


function updateCountdown() {

  if (countdownFinished) {
    return;
  }


  const now =
    new Date().getTime();


  const difference =
    targetDate - now;


  if (difference <= 0) {

    skipCountdown();

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


  document.getElementById("days")
    .textContent =
    String(days).padStart(2, "0");


  document.getElementById("hours")
    .textContent =
    String(hours).padStart(2, "0");


  document.getElementById("mins")
    .textContent =
    String(mins).padStart(2, "0");


  document.getElementById("secs")
    .textContent =
    String(secs).padStart(2, "0");

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);



/* =====================================
   SKIP COUNTDOWN
===================================== */

function skipCountdown() {

  countdownFinished =
    true;


  show("welcome");


  typeWelcome();


  startMusic();

}



/* =====================================
   MUSIC
===================================== */

function startMusic() {

  if (!music) {
    return;
  }


  music.volume = 0.35;


  const playPromise =
    music.play();


  if (
    playPromise !== undefined
  ) {

    playPromise.catch(
      () => {

        musicHint.classList.add(
          "show"
        );

      }
    );

  }

}


document.addEventListener(
  "click",
  function () {

    if (
      countdownFinished &&
      music.paused
    ) {

      startMusic();

    }

  }
);



/* =====================================
   WELCOME → LETTER
===================================== */

document
  .getElementById("openBtn")
  .addEventListener(
    "click",
    function () {

      show("letter");

    }
  );



/* =====================================
   ENVELOPE
===================================== */

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
      "A little message for you...";


    setTimeout(
      function () {

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
  function () {

    show("memories");

  }
);



/* =====================================
   MEMORIES → VIDEO
===================================== */

document
  .getElementById("videoBtn")
  .addEventListener(
    "click",
    function () {

      show("videoScreen");

    }
  );



/* =====================================
   VIDEO
===================================== */

birthdayVideo.addEventListener(
  "play",
  function () {

    music.pause();

  }
);


birthdayVideo.addEventListener(
  "ended",
  function () {

    startMusic();

  }
);



/* =====================================
   VIDEO → FINAL
===================================== */

document
  .getElementById("finishBtn")
  .addEventListener(
    "click",
    function () {

      birthdayVideo.pause();

      show("final");

      startFireworks();

    }
  );



/* =====================================
   FIREWORKS
===================================== */

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
    Math.random() *
    canvas.width;


  const y =
    Math.random() *
    canvas.height *
    0.55;


  for (
    let i = 0;
    i < 55;
    i++
  ) {

    const angle =
      Math.random() *
      Math.PI *
      2;


    const speed =
      Math.random() *
      5 +
      2;


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
    "rgba(5,3,8,0.18)";


  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  if (
    Math.random() <
    0.045
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
        `rgba(
          232,
          167,
          192,
          ${particle.life}
        )`;


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


  fireworksRunning =
    true;


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
   START
===================================== */

show("countdown");
```
