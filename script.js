const questions = [
  {
    question: "What is the name of Harry Potters Owl?",
    choices: ["Errol", "Crookshanks", "Hedwig", "Scabbers"],
    correct: 2
  },
  {
    question: "Which house of Hogwarts does Harry belong to?",
    choices: ["Ravenclaw", "Gryffindor", "Slytherin", "Hufflepuff"],
    correct: 1
  },
  {
    question: "What position does Harry play on his Quidditch team?",
    choices: ["Chaser", "Beater", "Seeker", "Keeper"],
    correct: 2
  },
  {
    question: "What is the name of the spell used to disarm an opponent?",
    choices: ["Lumos", "Expelliarmus", "Avada Kedavra", "Accio"],
    correct: 1
  },
  {
    question: "Who is the Half-Blood Prince?",
    choices: ["Severus Snape", "Sirius Black", "Tom Riddle", "Remus Lupin"],
    correct: 0
  },
  {
    question: "What shape is Harry Potters scar?",
    choices: ["Star", "Moon", "Lightening Bolt", "Snake"],
    correct: 2
  },
  {
    question: "What does the Marauders Map show?",
    choices: ["Hidden treasure", "Hogwarts and everyone inside", "Magical creatures", "Secret potion recipes"],
    correct: 1
  },
  {
    question: "Who was NOT a member of the Marauders?",
    choices: ["James Potter", "Remus Lupin", "Severus Snape", "Siruis Black"],
    correct: 2
  },
  {
    question: "What is the name of Hagrids three-headed dog?",
    choices: ["Fang", "Fluffy", "Norbert", "Aragog"],
    correct: 1
  },
  {
    question: "Which of these is NOT one of the Deathly Hallows?",
    choices: ["The Elder Wand", "The Ressurrection Stone", "The Invisibility Cloak", "The Sword of Gryffindor"],
    correct: 3
  }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;

  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";

  document.getElementById("correct-popup").classList.add("hidden");
  document.getElementById("wrong-popup").classList.add("hidden");

  q.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.className = "w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded";
    button.onclick = () => checkAnswer(index);
    choicesContainer.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestion].correct;

  if (selectedIndex === correctIndex) {
    score++;
    document.getElementById("score").textContent = score;
    document.getElementById("correct-popup").classList.remove("hidden");
    createMagicalRain();
  } else {
    document.getElementById("wrong-popup").classList.remove("hidden");
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  document.getElementById("final-score").textContent = score;

  const passMessage = document.getElementById("pass-message");
  const houseResult = document.getElementById("house-result");

  if (score >= 7) {
    passMessage.textContent = "✅ Passed! You're a Wizard, Harry!";
    passMessage.classList.add("text-green-600");

    // Generate a random house
    const houses = [
      { name: "Gryffindor", color: "text-red-600" },
      { name: "Hufflepuff", color: "text-yellow-500" },
      { name: "Ravenclaw", color: "text-blue-600" },
      { name: "Slytherin", color: "text-green-700" }
    ];

    const chosen = houses[Math.floor(Math.random() * houses.length)];

    houseResult.textContent = `The Sorting Hat has spoken... Welcome to ${chosen.name}!`;
    houseResult.className = `text-xl mt-4 font-bold ${chosen.color}`;
  } else {
    passMessage.textContent = "❌ You Didn't Pass. Try Again!";
    passMessage.classList.add("text-red-600");
    houseResult.textContent = ""; // Clear house result on fail
  }
}

function createStars(count = 100) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.textContent = '★';
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.fontSize = `${Math.random() * 10 + 6}px`;
    star.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
    star.style.opacity = Math.random() * 0.8 + 0.2;
    document.body.appendChild(star);
  }
}

function createMagicalRain(drops = 30) {
  for (let i = 0; i < drops; i++) {
    const drop = document.createElement('div');
    drop.classList.add('magic-drop');

    drop.style.left = `${Math.random() * 100}vw`;
    drop.style.width = `${Math.random() * 3 + 2}px`;
    drop.style.height = `${Math.random() * 12 + 8}px`;
    drop.style.animationDuration = `${Math.random() * 0.8 + 0.7}s`;

    document.body.appendChild(drop);

    setTimeout(() => {
      drop.remove();
    }, 1200);
  }
}

window.onload = () => {
  createStars(120);
};