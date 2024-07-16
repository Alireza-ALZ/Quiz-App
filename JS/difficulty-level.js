const difficultyButtons = document.querySelectorAll("button");

function setDifficultyLevel(event) {
  localStorage.setItem("difficulty", event.target.innerText.toLowerCase());
  window.location.assign("./index.html");
}

difficultyButtons.forEach((button) => {
  button.addEventListener("click", setDifficultyLevel);
});
