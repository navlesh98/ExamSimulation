let timeLeft;

function startTimer(seconds) {
  timeLeft = seconds;
  const timer = document.getElementById("timer");

  setInterval(() => {
    timeLeft--;
    timer.innerText = `Time left: ${Math.floor(timeLeft/60)}:${timeLeft%60}`;

    if (timeLeft <= 0) {
      window.location.href = "result.html";
    }
  }, 1000);
}
