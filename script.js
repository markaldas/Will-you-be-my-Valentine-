const crackBtn = document.getElementById("crackBtn");
const intro = document.getElementById("intro");
const questionScreen = document.getElementById("questionScreen");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const song = document.getElementById("song");

const warningBox = document.getElementById("warningBox");
const proceedBtn = document.getElementById("proceedBtn");
const scaredBtn = document.getElementById("scaredBtn");
const melonSection = document.getElementById("melonSection");
const watermelonEl = document.getElementById("watermelon");
const melonMessage = document.getElementById("melonMessage");

const destinyMeter = document.getElementById("destinyMeter");
const destinyPercent = document.getElementById("destinyPercent");
const barFill = document.getElementById("barFill");

let yesSize = 1;
let destiny = 0;
let noIndex = 0;

const noMessages = [
    "No",
    "Are you sure?",
    "Be serious.",
    "That's illegal.",
    "Just press yes.",
    "We both know."
];


// 🍉 Crack animation + show question
crackBtn.addEventListener("click", () => {

    watermelonEl.classList.add("wiggle");
    document.body.classList.add("shake");

    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 500);

    setTimeout(() => {
        intro.classList.add("hidden");
        questionScreen.classList.remove("hidden");
        destinyMeter.classList.remove("hidden");
        song.play().catch(() => { });
    }, 1000);
});


// 💔 No button behavior (merged into ONE listener)
noBtn.addEventListener("mouseover", () => {

    // Move button randomly
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 60);

    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // Change text
    noBtn.innerText = noMessages[noIndex % noMessages.length];
    noIndex++;

    // Grow yes button slightly
    yesSize += 0.1;
    yesBtn.style.transform = `scale(${yesSize})`;

    // Increase destiny meter
    destiny += 15;
    if (destiny > 100) destiny = 100;

    destinyPercent.innerText = destiny;
    barFill.style.width = destiny + "%";

    if (destiny === 100) {
        yesBtn.classList.add("glow");
    }
});


// 💚 YES BUTTON
yesBtn.addEventListener("click", () => {

    questionScreen.classList.add("hidden");
    const finalScreen = document.getElementById("finalScreen");
    finalScreen.classList.remove("hidden");

    const systemText = document.getElementById("systemText");
    const systemSub = document.getElementById("systemSub");

    let percent = 0;

    systemText.innerText = "System processing...";
    systemSub.innerText = "Validating soulmate compatibility... 0%";

    const interval = setInterval(() => {
        percent += 4;
        systemSub.innerText =
            "Validating soulmate compatibility... " + percent + "%";

        if (percent >= 100) {
            clearInterval(interval);

            systemText.innerText = "100% MATCH DETECTED 🍉";
            document.body.classList.add("shake");

            setTimeout(() => {
                document.body.classList.remove("shake");
            }, 400);

            systemSub.innerText = "";

            heartExplosion();

            setTimeout(() => {
                typeFinalMessage();
                startFloatingLoop();
            }, 1000);
        }
    }, 100);
});


// ❤️ Explosion
function heartExplosion() {
    const explosionCount = 50;

    for (let i = 0; i < explosionCount; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerText = Math.random() > 0.3 ? "❤️" : "⚫";

        const x = (Math.random() - 0.5) * 700 + "px";
        const y = (Math.random() - 0.5) * 700 + "px";

        heart.style.setProperty("--x", x);
        heart.style.setProperty("--y", y);

        heart.style.left = window.innerWidth / 2 + "px";
        heart.style.top = window.innerHeight / 2 + "px";

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    }
}


// ⌨️ Typing effect
function typeFinalMessage() {
    const systemText = document.getElementById("systemText");

    const message = "It's us against the world Evelin. Happy Valentine's Day 🍉 😘";

    systemText.innerText = "";
    let i = 0;

    function type() {
        if (i < message.length) {
            systemText.textContent += message[i];
            i++;
            setTimeout(type, 60);
        }
    }

    type();
}


// 💫 Floating loop
function startFloatingLoop() {
    setInterval(() => {
        const float = document.createElement("div");
        float.classList.add("floating");

        float.innerText = Math.random() > 0.5 ? "❤️" : "🍉";

        float.style.left = Math.random() * window.innerWidth + "px";
        float.style.bottom = "0px";

        document.body.appendChild(float);

        setTimeout(() => float.remove(), 6000);
    }, 400);
}


// ⚠️ Warning buttons
scaredBtn.addEventListener("click", () => {
    scaredBtn.innerText = "Too bad.";
    setTimeout(() => {
        warningBox.classList.add("hidden");
        melonSection.classList.remove("hidden");
    }, 800);
});

proceedBtn.addEventListener("click", () => {
    warningBox.classList.add("hidden");
    melonSection.classList.remove("hidden");
});


// 🍉 Watermelon hover effect
watermelonEl.addEventListener("mouseover", () => {
    watermelonEl.classList.add("wiggle");
    melonMessage.innerText = "Careful... pressure building...";

    for (let i = 0; i < 5; i++) {
        const seed = document.createElement("div");
        seed.classList.add("seed");
        seed.innerText = "⚫";
        seed.style.left = Math.random() * window.innerWidth + "px";
        seed.style.top = window.innerHeight / 2 + "px";
        document.body.appendChild(seed);
        setTimeout(() => seed.remove(), 3000);
    }

    setTimeout(() => {
        watermelonEl.classList.remove("wiggle");
    }, 400);
});
