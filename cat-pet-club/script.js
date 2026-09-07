const petCount = document.getElementById("petCount");
const counter = document.getElementById("counter");
const catButton = document.getElementById("catButton");
const catIllustration = document.getElementById("catIllustration");
const reactionText = document.getElementById("reactionText");
const rareLabel = document.getElementById("rareLabel");
const status = document.getElementById("status");
const gameArea = document.getElementById("gameArea");
const sparkles = document.getElementById("sparkles");

let pets = 0;

const expressions = {
  happy: "expression-happy",
  love: "expression-love",
  sleepy: "expression-sleepy",
  angry: "expression-angry",
  surprised: "expression-surprised",
  smug: "expression-smug",
  sad: "expression-sad",
  excited: "expression-excited"
};

const reactions = [
  { message: "mrrp!", expression: "happy", rarity: "normal" },
  { message: "purrrr...", expression: "happy", rarity: "normal" },
  { message: "that tickles!", expression: "surprised", rarity: "normal" },
  { message: "again?", expression: "smug", rarity: "normal" },
  { message: "hehe 😽", expression: "love", rarity: "normal" },
  { message: "stop poking me 😾", expression: "angry", rarity: "normal" },
  { message: "mrrrow!", expression: "excited", rarity: "normal" },
  { message: "so many pets!", expression: "excited", rarity: "normal" },
  { message: "don't stop!", expression: "love", rarity: "normal" },
  { message: "hehe...", expression: "smug", rarity: "normal" },
  { message: "I like that!", expression: "happy", rarity: "normal" },
  { message: "one more. maybe.", expression: "smug", rarity: "normal" },
  { message: "tiny head pats detected", expression: "happy", rarity: "normal" },
  { message: "pawsome.", expression: "excited", rarity: "normal" },
  { message: "mmm. acceptable.", expression: "smug", rarity: "normal" },
  { message: "I'm getting spoiled 🥺", expression: "love", rarity: "normal" },
  { message: "wait... was that a compliment?", expression: "surprised", rarity: "normal" },
  { message: "five stars. would pet again.", expression: "happy", rarity: "normal" }
];

const rareReactions = [
  { message: "✨ THE CAT LOVES YOU!", expression: "love" },
  { message: "💕 You're my favorite human!", expression: "love" },
  { message: "🐱 Legendary pet detected!", expression: "excited" },
  { message: "✨ MAXIMUM CUDDLES!", expression: "excited" }
];

function chooseReaction() {
  // Roughly 8% chance of a rare reaction.
  if (Math.random() < 0.08) {
    const rare = rareReactions[Math.floor(Math.random() * rareReactions.length)];
    return { ...rare, rarity: "rare" };
  }

  return reactions[Math.floor(Math.random() * reactions.length)];
}

function setExpression(expression) {
  Object.values(expressions).forEach((className) => {
    catIllustration.classList.remove(className);
  });

  const className = expressions[expression];
  if (className) {
    catIllustration.classList.add(className);
  }
}

function animateCat() {
  catIllustration.classList.remove("cat-petting");
  // Force a reflow so repeated fast clicks restart the animation.
  void catIllustration.offsetWidth;
  catIllustration.classList.add("cat-petting");
}

function animateCounter() {
  counter.classList.remove("animate-counterPop");
  void counter.offsetWidth;
  counter.classList.add("animate-counterPop");
}

function showReaction(reaction) {
  reactionText.classList.remove("animate-reactionIn", "animate-rarePop");
  void reactionText.offsetWidth;

  reactionText.querySelector("span").textContent = reaction.message;

  if (reaction.rarity === "rare") {
    reactionText.classList.add("animate-rarePop", "bg-[#FFF0F0]", "ring-2", "ring-coral/30");
    rareLabel.textContent = "RARE REACTION ✨";
    rareLabel.classList.remove("hidden");
    rareLabel.classList.add("animate-reactionIn");
    gameArea.classList.add("rare-mode");
    createSparkles(16);

    window.setTimeout(() => {
      rareLabel.classList.add("hidden");
      reactionText.classList.remove("bg-[#FFF0F0]", "ring-2", "ring-coral/30");
      gameArea.classList.remove("rare-mode");
    }, 1700);
  } else {
    reactionText.classList.add("animate-reactionIn");
    rareLabel.classList.add("hidden");
    reactionText.classList.remove("bg-[#FFF0F0]", "ring-2", "ring-coral/30");
  }
}

function createFloatingPet() {
  const floating = document.createElement("div");
  floating.textContent = "+1 🐾";

  floating.className =
    "pointer-events-none absolute left-1/2 top-[32%] z-30 whitespace-nowrap " +
    "-translate-x-1/2 font-black text-xl text-coral drop-shadow-sm animate-floatUp";

  const randomX = Math.round((Math.random() - 0.5) * 100);
  floating.style.marginLeft = `${randomX}px`;

  gameArea.appendChild(floating);

  window.setTimeout(() => floating.remove(), 950);
}

function createSparkles(amount = 10) {
  const symbols = ["✦", "✧", "·", "♡", "✿"];

  for (let i = 0; i < amount; i++) {
    const sparkle = document.createElement("span");
    sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 55 + Math.random() * 90;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    sparkle.style.left = `${50 + (Math.random() - 0.5) * 22}%`;
    sparkle.style.top = `${36 + (Math.random() - 0.5) * 18}%`;
    sparkle.style.setProperty("--dx", `${dx}px`);
    sparkle.style.setProperty("--dy", `${dy}px`);
    sparkle.style.animationDelay = `${Math.random() * 120}ms`;

    sparkle.className =
      "absolute text-2xl font-black text-coral animate-sparkle";

    sparkles.appendChild(sparkle);

    window.setTimeout(() => sparkle.remove(), 1100);
  }
}

function updateStatus(reaction, count) {
  if (reaction.rarity === "rare") {
    status.textContent = "The cat has chosen YOU. 🥹";
    status.className =
      "rounded-full bg-peach/70 px-4 py-2 text-sm font-black text-ink animate-reactionIn";
    return;
  }

  if (count === 1) {
    status.textContent = "First pet! The club approves. 🐾";
  } else if (count % 10 === 0) {
    status.textContent = `${count} pets?! The cat is very spoiled.`;
  } else if (reaction.expression === "sleepy") {
    status.textContent = "Someone needs a tiny cat nap...";
  } else if (reaction.expression === "angry") {
    status.textContent = "Uh-oh. Proceed with caution. 😾";
  } else if (reaction.expression === "love") {
    status.textContent = "Friendship level: dangerously cute.";
  } else {
    status.textContent = "The cat is waiting for another pet...";
  }
}

function petCat() {
  pets += 1;
  petCount.textContent = pets;

  const reaction = chooseReaction();

  setExpression(reaction.expression);
  animateCat();
  animateCounter();
  createFloatingPet();
  showReaction(reaction);
  updateStatus(reaction, pets);
}

catButton.addEventListener("click", petCat);

document.getElementById("petButton").addEventListener("click", petCat);

catIllustration.addEventListener("animationend", () => {
  catIllustration.classList.remove("cat-petting");
});

// Keyboard accessibility is provided naturally by the button.
// Prevent accidental text selection during rapid interaction.
catButton.addEventListener("mousedown", (event) => {
  event.preventDefault();
  catButton.focus();
});
