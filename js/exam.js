let questions = [];
let current = 0;
let score = 0;

const params = new URLSearchParams(window.location.search);
const subject = params.get("subject");
const year = params.get("year");

fetch(`data/${subject}/${year}.json`)
  .then(res => res.json())
  .then(data => {
    questions = data.questions;
    startTimer(data.duration);
    showQuestion();
  });

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => {
      if (i === q.answer) score++;
      nextQuestion();
    };
    optionsDiv.appendChild(btn);
  });
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    localStorage.setItem("score", score);
    window.location.href = "result.html";
  }
}
