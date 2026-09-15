/* =========================================
   PROGRAMMER SIMULATOR
========================================= */


/* =========================================
   GAME STATE
========================================= */

let game = {

    bugs: 1,

    coffee: 100,

    sanity: 100,

    score: 0,

    progress: 0,

    coffeesDrunk: 0,

    commits: 0,

    firstBugFixed: false,

    gameOver: false,

    projectFinished: false

};


/* =========================================
   GET HTML ELEMENTS
========================================= */

const bugsElement =
    document.getElementById("bugs");

const coffeeElement =
    document.getElementById("coffee");

const sanityElement =
    document.getElementById("sanity");

const scoreElement =
    document.getElementById("score");

const progressElement =
    document.getElementById("progress");

const progressTextElement =
    document.getElementById("progressText");

const projectStatusElement =
    document.getElementById("projectStatus");

const terminalElement =
    document.getElementById("terminal");

const editorElement =
    document.querySelector(".editor-panel");

const popupElement =
    document.getElementById("popup");

const popupIconElement =
    document.getElementById("popupIcon");

const popupTitleElement =
    document.getElementById("popupTitle");

const popupMessageElement =
    document.getElementById("popupMessage");

const gameOverElement =
    document.getElementById("gameOver");


/* =========================================
   BUTTONS
========================================= */

const runButton =
    document.getElementById("runButton");

const fixButton =
    document.getElementById("fixButton");

const commitButton =
    document.getElementById("commitButton");

const coffeeButton =
    document.getElementById("coffeeButton");

const clearTerminalButton =
    document.getElementById("clearTerminal");

const popupCloseButton =
    document.getElementById("popupClose");

const restartButton =
    document.getElementById("restartButton");


/* =========================================
   UPDATE GAME UI
========================================= */

function updateUI() {

    bugsElement.textContent =
        game.bugs;


    coffeeElement.textContent =
        game.coffee + "%";


    sanityElement.textContent =
        game.sanity + "%";


    scoreElement.textContent =
        game.score;


    progressElement.style.width =
        game.progress + "%";


    progressTextElement.textContent =
        game.progress + "%";


    updateProjectStatus();

    updateAchievements();

}


/* =========================================
   PROJECT STATUS
========================================= */

function updateProjectStatus() {

    if (game.progress >= 100) {

        projectStatusElement.textContent =
            "Status: SHIPPED 🚀";

        return;

    }


    if (game.bugs >= 5) {

        projectStatusElement.textContent =
            "Status: Absolute disaster 💀";

        return;

    }


    if (game.bugs >= 3) {

        projectStatusElement.textContent =
            "Status: Send help.";

        return;

    }


    if (game.coffee <= 20) {

        projectStatusElement.textContent =
            "Status: Developer dying ☕";

        return;

    }


    if (game.sanity <= 30) {

        projectStatusElement.textContent =
            "Status: Developer.exe unstable";

        return;

    }


    projectStatusElement.textContent =
        "Status: Somehow alive";

}


/* =========================================
   TERMINAL LOG
========================================= */

function log(message, type = "") {

    const line =
        document.createElement("div");

    line.className =
        "terminal-line " + type;

    line.textContent =
        message;

    terminalElement.appendChild(line);

    terminalElement.scrollTop =
        terminalElement.scrollHeight;

}


/* =========================================
   RUN CODE
========================================= */

function runCode() {

    if (game.gameOver) {
        return;
    }


    log("$ npm run dev", "info");


    log(
        "Starting development server..."
    );


    /* Coffee is consumed */

    game.coffee -= 5;


    /* Sanity decreases */

    game.sanity -= 3;


    /* BUG CHECK */

    if (game.bugs > 0) {

        log(
            "❌ TypeError: website.destroy is not a function",
            "error-text"
        );


        /* Running broken code creates another bug */

        game.bugs += 1;


        game.score -= 10;


        shakeEditor();


        showPopup(

            "💀 NEW BUG!",

            "You ran broken code and somehow created ANOTHER bug."

        );

    }

    else {

        log(
            "✅ Code executed successfully!",
            "success"
        );


        game.progress += 10;

        game.score += 50;

    }


    limitValues();

    checkGameOver();

    checkWin();

    updateUI();

}


/* =========================================
   FIX BUG
========================================= */

function fixBug() {

    if (game.gameOver) {
        return;
    }


    if (game.bugs <= 0) {

        log(
            "⚠ No bugs found.",
            "warning"
        );


        showPopup(

            "🤨 SUSPICIOUS",

            "There are no bugs. Are you sure you're a programmer?"

        );


        return;

    }


    log(
        "🔧 Searching for bug...",
        "warning"
    );


    game.coffee -= 8;

    game.sanity -= 5;


    setTimeout(() => {

        if (game.gameOver) {
            return;
        }


        game.bugs -= 1;

        game.score += 100;

        game.progress += 15;


        game.firstBugFixed = true;


        log(
            "🔍 Bug located.",
            "info"
        );


        log(
            "🔧 Applying extremely questionable fix...",
            "warning"
        );


        setTimeout(() => {

            if (game.gameOver) {
                return;
            }


            /*

                The funny mechanic:

                There is a 65% chance
                that fixing a bug
                creates another bug.

            */

            if (Math.random() < 0.65) {

                game.bugs += 1;


                log(
                    "💀 FIX CREATED ANOTHER BUG!",
                    "error-text"
                );


                showPopup(

                    "💀 CLASSIC",

                    "You fixed the bug. Unfortunately, your fix created another bug."

                );

            }

            else {

                log(
                    "✅ Bug successfully fixed!",
                    "success"
                );


                showPopup(

                    "🎉 BUG FIXED!",

                    "You fixed a bug without creating another one. This is extremely rare."

                );

            }


            limitValues();

            checkGameOver();

            checkWin();

            updateUI();

        }, 500);


    }, 700);


    updateUI();

}


/* =========================================
   COMMIT
========================================= */

function commitCode() {

    if (game.gameOver) {
        return;
    }


    log(
        "$ git add .",
        "info"
    );


    setTimeout(() => {

        log(
            "$ git commit -m \"please work\"",
            "info"
        );


        if (game.bugs > 0) {

            game.sanity -= 8;


            log(
                "❌ Commit rejected.",
                "error-text"
            );


            log(
                "Reason: Too many bugs.",
                "error-text"
            );


            showPopup(

                "🚫 GIT SAID NO",

                "You tried committing code with " +
                game.bugs +
                " bug(s). GitHub has standards."

            );

        }

        else {

            game.score += 200;

            game.progress += 20;

            game.commits += 1;


            log(
                "Writing objects...",
                "info"
            );


            log(
                "🚀 Commit successful!",
                "success"
            );


            showPopup(

                "🚀 SHIPPED!",

                "Your code works. Nobody knows why. DO NOT TOUCH IT."

            );

        }


        limitValues();

        checkWin();

        checkGameOver();

        updateUI();

    }, 500);

}


/* =========================================
   DRINK COFFEE
========================================= */

function drinkCoffee() {

    if (game.gameOver) {
        return;
    }


    if (game.coffee >= 100) {

        log(
            "☕ Coffee already at 100%.",
            "warning"
        );


        showPopup(

            "☕ TOO MUCH COFFEE",

            "Your blood is currently 73% coffee."

        );


        return;

    }


    game.coffee += 25;


    game.sanity += 8;


    game.coffeesDrunk += 1;


    game.score += 10;


    log(
        "☕ *SLURP* Developer fuel increased.",
        "success"
    );


    if (game.coffeesDrunk === 1) {

        showPopup(

            "☕ CAFFEINE ACQUIRED",

            "You are now 17% more confident and 83% more awake."

        );

    }


    if (game.coffeesDrunk === 3) {

        showPopup(

            "⚡ CAFFEINE OVERLOAD",

            "You have unlocked the ability to see JavaScript in your dreams."

        );

    }


    limitValues();

    updateUI();

}


/* =========================================
   RANDOM EVENTS
========================================= */

function randomEvent() {

    if (game.gameOver) {
        return;
    }


    const events = [

        {

            message:
                "🐛 A wild bug appeared!",

            effect: function () {

                game.bugs += 1;

            }

        },


        {

            message:
                "☕ Someone left coffee on your desk!",

            effect: function () {

                game.coffee += 15;

            }

        },


        {

            message:
                "📱 You checked Instagram for 2 minutes.",

            effect: function () {

                game.sanity -= 7;

            }

        },


        {

            message:
                "🌐 Internet disconnected for absolutely no reason.",

            effect: function () {

                game.sanity -= 12;

                document.getElementById(
                    "internetStatus"
                ).textContent =
                    "🌐 Internet: 💀";

                setTimeout(() => {

                    document.getElementById(
                        "internetStatus"
                    ).textContent =
                        "🌐 Internet: OK";

                }, 2500);

            }

        },


        {

            message:
                "🧠 Stack Overflow saved your life.",

            effect: function () {

                if (game.bugs > 0) {

                    game.bugs -= 1;

                }

                game.score += 50;

            }

        },


        {

            message:
                "💻 VS Code crashed. Just kidding... probably.",

            effect: function () {

                game.sanity -= 5;

            }

        },


        {

            message:
                "👨‍💻 Your friend said: 'Just rewrite everything.'",

            effect: function () {

                game.sanity -= 15;

            }

        },


        {

            message:
                "🐧 A random Linux user judged your code.",

            effect: function () {

                game.sanity -= 4;

            }

        }

    ];


    const event =
        events[
            Math.floor(
                Math.random() * events.length
            )
        ];


    log(
        event.message,
        "warning"
    );


    event.effect();


    limitValues();

    checkGameOver();

    updateUI();

}


/* =========================================
   RANDOM EVENTS TIMER
========================================= */

setInterval(

    randomEvent,

    7000

);


/* =========================================
   COFFEE DRAIN
========================================= */

setInterval(() => {

    if (game.gameOver) {
        return;
    }


    game.coffee -= 1;


    if (game.coffee <= 20) {

        log(
            "☕ WARNING: Coffee critically low.",
            "warning"
        );

    }


    limitValues();

    checkGameOver();

    updateUI();

}, 4000);


/* =========================================
   SANITY DRAIN
========================================= */

setInterval(() => {

    if (game.gameOver) {
        return;
    }


    if (game.bugs >= 5) {

        game.sanity -= 2;

        log(
            "🧠 Too many bugs are damaging your sanity.",
            "warning"
        );

    }


    limitValues();

    checkGameOver();

    updateUI();

}, 6000);


/* =========================================
   CHECK GAME OVER
========================================= */

function checkGameOver() {

    if (game.sanity <= 0) {

        game.sanity = 0;

        game.gameOver = true;


        log(
            "💀 DEVELOPER.EXE HAS STOPPED RESPONDING.",
            "error-text"
        );


        gameOverElement.style.display =
            "flex";

    }

}


/* =========================================
   CHECK WIN
========================================= */

function checkWin() {

    if (
        game.progress >= 100 &&
        !game.projectFinished
    ) {

        game.progress = 100;

        game.projectFinished = true;


        game.score += 500;


        log(
            "🏆 BUILD SUCCESSFUL!",
            "success"
        );


        log(
            "🚀 Website deployed to production.",
            "success"
        );


        showPopup(

            "🏆 PROJECT FINISHED!",

            "You somehow completed the project. Nobody knows how. Congratulations!"

        );

    }

}


/* =========================================
   LIMIT VALUES
========================================= */

function limitValues() {

    game.coffee =
        Math.max(
            0,
            Math.min(100, game.coffee)
        );


    game.sanity =
        Math.max(
            0,
            Math.min(100, game.sanity)
        );


    game.progress =
        Math.max(
            0,
            Math.min(100, game.progress)
        );


    game.score =
        Math.max(
            0,
            game.score
        );


    game.bugs =
        Math.max(
            0,
            game.bugs
        );

}


/* =========================================
   POPUP
========================================= */

function showPopup(title, message, icon = "💀") {

    popupIconElement.textContent =
        icon;

    popupTitleElement.textContent =
        title;

    popupMessageElement.textContent =
        message;

    popupElement.style.display =
        "flex";

}


/* =========================================
   CLOSE POPUP
========================================= */

function closePopup() {

    popupElement.style.display =
        "none";

}


popupCloseButton.addEventListener(
    "click",
    closePopup
);


/* =========================================
   SHAKE EDITOR
========================================= */

function shakeEditor() {

    editorElement.classList.remove(
        "shake"
    );


    void editorElement.offsetWidth;


    editorElement.classList.add(
        "shake"
    );


    setTimeout(() => {

        editorElement.classList.remove(
            "shake"
        );

    }, 400);

}


/* =========================================
   CLEAR TERMINAL
========================================= */

clearTerminalButton.addEventListener(
    "click",
    () => {

        terminalElement.innerHTML = "";

        log(
            "$ terminal cleared",
            "info"
        );

    }
);


/* =========================================
   RESTART
========================================= */

restartButton.addEventListener(
    "click",
    () => {

        game = {

            bugs: 1,

            coffee: 100,

            sanity: 100,

            score: 0,

            progress: 0,

            coffeesDrunk: 0,

            commits: 0,

            firstBugFixed: false,

            gameOver: false,

            projectFinished: false

        };


        gameOverElement.style.display =
            "none";


        terminalElement.innerHTML = "";


        log(
            "👨‍💻 Welcome back, developer.",
            "success"
        );


        log(
            "Your mission: fix ONE bug.",
            "info"
        );


        log(
            "Good luck. You're going to need it.",
            "warning"
        );


        updateUI();

    }
);


/* =========================================
   ACHIEVEMENTS
========================================= */

function updateAchievements() {

    let unlocked = 0;


    /* Bug Hunter */

    if (game.firstBugFixed) {

        unlockAchievement(
            "achievement1"
        );

        unlocked++;

    }


    /* Caffeine Powered */

    if (game.coffeesDrunk >= 3) {

        unlockAchievement(
            "achievement2"
        );

        unlocked++;

    }


    /* First Commit */

    if (game.commits >= 1) {

        unlockAchievement(
            "achievement3"
        );

        unlocked++;

    }


    /* Still Sane */

    if (
        game.sanity > 50
    ) {

        unlockAchievement(
            "achievement4"
        );

        unlocked++;

    }


    /* Ship It */

    if (
        game.progress >= 100
    ) {

        unlockAchievement(
            "achievement5"
        );

        unlocked++;

    }


    document.getElementById(
        "achievementCount"
    ).textContent =
        unlocked + " / 5";

}


/* =========================================
   UNLOCK ACHIEVEMENT
========================================= */

function unlockAchievement(id) {

    const achievement =
        document.getElementById(id);

    achievement.classList.add(
        "unlocked"
    );

}


/* =========================================
   KEYBOARD SHORTCUTS
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "r") {

            runCode();

        }


        if (event.key === "f") {

            fixBug();

        }


        if (event.key === "c") {

            commitCode();

        }


        if (event.key === " ") {

            event.preventDefault();

            drinkCoffee();

        }

    }
);


/* =========================================
   START GAME
========================================= */

updateUI();


log(
    "👨‍💻 Welcome, developer.",
    "success"
);


log(
    "Your mission: fix ONE bug.",
    "info"
);


log(
    "Current bug: website.destroy()",
    "error-text"
);


log(
    "Hint: Try clicking 'Fix Bug'.",
    "warning"
);