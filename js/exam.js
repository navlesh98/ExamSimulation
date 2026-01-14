let questions = [];
let currentIndex = 0;
let selectedAnswer = null;
let score = 0;

const params = new URLSearchParams(window.location.search);
const subject = params.get("subject");
const year = params.get("year");

fetch(`data/${subject}/${year}.json`)
  .then(res => res.json())
  .then(data => {
    questions = data.questions;
    startTimer(data.duration);
    renderQuestion();
  });

function renderQuestion() {
  selectedAnswer = null;
  document.getElementById("nextBtn").disabled = true;

  const q = questions[currentIndex];
  document.getElementById("question-text").innerText = q.question;
  document.getElementById("progress").innerText =
    `Question ${currentIndex + 1} / ${questions.length}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;

    div.onclick = () => {
      document
        .querySelectorAll(".option")
        .forEach(o => o.classList.remove("selected"));

      div.classList.add("selected");
      selectedAnswer = index;
      document.getElementById("nextBtn").disabled = false;
    };

    optionsDiv.appendChild(div);
  });
}

document.getElementById("nextBtn").onclick = () => {
  if (selectedAnswer === questions[currentIndex].answer) {
    score++;
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);
    window.location.href = "result.html";
  }
};
