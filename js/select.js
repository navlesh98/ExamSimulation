let selectedSubject = null;
let selectedYear = null;

document.querySelectorAll(".subject-card").forEach(card => {
  card.onclick = () => {
    document
      .querySelectorAll(".subject-card")
      .forEach(c => c.classList.remove("selected"));

    card.classList.add("selected");
    selectedSubject = card.dataset.subject;
    checkReady();
  };
});

document.querySelectorAll(".year-btn").forEach(btn => {
  btn.onclick = () => {
    document
      .querySelectorAll(".year-btn")
      .forEach(b => b.classList.remove("selected"));

    btn.classList.add("selected");
    selectedYear = btn.dataset.year;
    checkReady();
  };
});

function checkReady() {
  document.getElementById("startBtn").disabled =
    !(selectedSubject && selectedYear);
}

document.getElementById("startBtn").onclick = () => {
  window.location.href =
    `exam.html?subject=${selectedSubject}&year=${selectedYear}`;
};
