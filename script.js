```javascript
/* =========================================================
   SCREENS
========================================================= */

const screens = {

    countdown:
        document.getElementById("countdown"),

    welcome:
        document.getElementById("welcome"),

    letter:
        document.getElementById("letter"),

    chapter:
        document.getElementById("chapter"),

    memories:
        document.getElementById("memories"),

    videoIntro:
        document.getElementById("videoIntro"),

    video:
        document.getElementById("videoScreen"),

    final:
        document.getElementById("final")

};


/* =========================================================
   PROGRESS
========================================================= */

const progressNumber =
    document.getElementById(
        "progressNumber"
    );


function setProgress(number){

    progressNumber.textContent =
        String(number).padStart(2,"0");

}


/* =========================================================
   SHOW SCREEN
========================================================= */

function show(screen, number){

    Object
        .values(screens)
        .forEach(
            function(item){

                item.classList
                    .remove("active");

            }
        );


    screen.classList.add("active");


    if(number){

        setProgress(number);

    }

}


/* =========================================================
   MUSIC
========================================================= */

const music =
    document.getElementById("music");


const musicControl =
    document.getElementById("musicControl");


const musicIcon =
    document.getElementById("musicIcon");


const musicStatus =
    document.getElementById("musicStatus");


let musicStarted = false;


function startMusic(){

    music.volume = 0.35;

    music.play()
        .then(
            function(){

                musicStarted = true;

                musicIcon.textContent = "♫";

                musicStatus.textContent =
                    "Playing";

            }
        )
        .catch(
            function(){

            }
        );

}


musicControl.addEventListener(
    "click",
    function(){

        if(
            music.paused
        ){

            startMusic();

        }

        else{

            music.pause();

            musicIcon.textContent =
                "♫";

            musicStatus.textContent =
                "Music";

        }

    }
);


/* =========================================================
   WELCOME TYPING
========================================================= */

const welcomeMessage =
    "Tonight is all about you. I hope you're ready for a little journey through some memories... ❤️";


function typeWelcome(){

    const text =
        document.getElementById(
            "welcomeText"
        );


    text.textContent = "";


    let i = 0;


    const interval =
        setInterval(
            function(){

                text.textContent +=
                    welcomeMessage[i];

                i++;


                if(
                    i >=
                    welcomeMessage.length
                ){

                    clearInterval(
                        interval
                    );

                }

            },
            28
        );

}


/* =========================================================
   SKIP COUNTDOWN
========================================================= */

document
    .getElementById("testBtn")
    .addEventListener(
        "click",
        function(){

            show(
                screens.welcome,
                1
            );

            typeWelcome();

            startMusic();

        }
    );


/* =========================================================
   WELCOME -> LETTER
========================================================= */

document
    .getElementById("openBtn")
    .addEventListener(
        "click",
        function(){

            show(
                screens.letter,
                2
            );

        }
    );


/* =========================================================
   ENVELOPE
========================================================= */

const envelope =
    document.getElementById(
        "envelope"
    );


const continueBtn =
    document.getElementById(
        "continueBtn"
    );


const tapHint =
    document.getElementById(
        "tapHint"
    );


let envelopeOpened = false;


envelope.addEventListener(
    "click",
    function(){

        if(envelopeOpened){

            return;

        }


        envelopeOpened = true;


        envelope.classList.add(
            "open"
        );


        tapHint.textContent =
            "A little something from me to you...";


        setTimeout(
            function(){

                continueBtn
                    .classList
                    .remove("hidden");

            },
            1300
        );

    }
);


/* =========================================================
   LETTER -> CHAPTER
========================================================= */

continueBtn.addEventListener(
    "click",
    function(){

        show(
            screens.chapter,
            3
        );

    }
);


/* =========================================================
   CHAPTER -> MEMORIES
========================================================= */

document
    .getElementById("memoriesBtn")
    .addEventListener(
        "click",
        function(){

            show(
                screens.memories,
                4
            );

        }
    );


/* =========================================================
   MEMORIES -> VIDEO INTRO
========================================================= */

document
    .getElementById("videoIntroBtn")
    .addEventListener(
        "click",
        function(){

            show(
                screens.videoIntro,
                5
            );

        }
    );


/* =========================================================
   VIDEO INTRO -> VIDEO
========================================================= */

document
    .getElementById("watchBtn")
    .addEventListener(
        "click",
        function(){

            show(
                screens.video,
                5
            );

        }
    );


/* =========================================================
   VIDEO
========================================================= */

const birthdayVideo =
    document.getElementById(
        "birthdayVideo"
    );


birthdayVideo.addEventListener(
    "play",
    function(){

        music.pause();

        musicStatus.textContent =
            "Music";

    }
);


birthdayVideo.addEventListener(
    "ended",
    function(){

        musicStatus.textContent =
            "Playing";

        startMusic();

    }
);


/* =========================================================
   VIDEO -> FINAL
========================================================= */

document
    .getElementById("finishBtn")
    .addEventListener(
        "click",
        function(){

            birthdayVideo.pause();

            show(
                screens.final,
                6
            );

            startFireworks();

        }
    );


/* =========================================================
   COUNTDOWN
========================================================= */

const target =
    new Date(
        "August 31, 2026 00:00:00"
    ).getTime();


function updateCountdown(){

    const diff =
        target - Date.now();


    if(diff <= 0){

        show(
            screens.welcome,
            1
        );

        typeWelcome();

        startMusic();

        return;

    }


    const days =
        Math.floor(
            diff /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            diff /
            (1000 * 60 * 60)
        ) % 24;


    const mins =
        Math.floor(
            diff /
            (1000 * 60)
        ) % 60;


    const secs =
        Math.floor(
            diff / 1000
        ) % 60;


    document
        .getElementById("days")
        .textContent =
        String(days)
        .padStart(2,"0");


    document
        .getElementById("hours")
        .textContent =
        String(hours)
        .padStart(2,"0");


    document
        .getElementById("mins")
        .textContent =
        String(mins)
        .padStart(2,"0");


    document
        .getElementById("secs")
        .textContent =
        String(secs)
        .padStart(2,"0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   FIREWORKS
========================================================= */

const canvas =
    document.getElementById(
        "fireworks"
    );


const ctx =
    canvas.getContext("2d");


let particles = [];


let fireworksStarted = false;


function resizeCanvas(){

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


function createFirework(){

    const x =
        Math.random() *
        canvas.width;


    const y =
        Math.random() *
        canvas.height *
        0.55;


    for(
        let i = 0;
        i < 65;
        i++
    ){

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() * 5 + 2;


        particles.push({

            x:x,

            y:y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:1,

            decay:
                Math.random() *
                .018 +
                .012,

            size:
                Math.random() *
                2 +
                1

        });

    }

}


function animateFireworks(){

    if(!fireworksStarted){

        return;

    }


    ctx.fillStyle =
        "rgba(5,3,8,.18)";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    if(
        Math.random() < .055
    ){

        createFirework();

    }


    particles.forEach(
        function(p){

            p.x += p.vx;

            p.y += p.vy;

            p.vy += .035;

            p.life -= p.decay;


            ctx.beginPath();


            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "rgba(232,167,192," +
                p.life +
                ")";


            ctx.fill();

        }
    );


    particles =
        particles.filter(
            function(p){

                return p.life > 0;

            }
        );


    requestAnimationFrame(
        animateFireworks
    );

}


function startFireworks(){

    if(fireworksStarted){

        return;

    }


    fireworksStarted = true;

    animateFireworks();

}
```
