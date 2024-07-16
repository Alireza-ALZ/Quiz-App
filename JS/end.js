let allScores = JSON.parse(localStorage.getItem("allScores")) || [];
const scoreBox = document.querySelector("#score");
const saveButton = document.querySelector("#save");
const username = document.querySelector("#username");
const alertt = document.querySelector("#alert");
const clientScore = JSON.parse(localStorage.getItem("score"));

function saveHandler() {
  if (clientScore) {
    if (username.value.trim()) {
      const clientInformation = {
        username: username.value,
        score: clientScore,
      };
      allScores.push(clientInformation);
      allScores.sort((a, b) => b.score - a.score); // Sorting object by scores
      allScores.splice(10); // Only ten of the best scores will save
      localStorage.setItem("allScores", JSON.stringify(allScores));
      localStorage.removeItem("score"); // For saving memory
      alert("Your score saved successfully !");
      window.location.assign("/index.html");
    } else {
      showAlert("Please enter your username !", "orange");
    }
  } else {
    showAlert("Your score must be higher than 0 !", "red");
  }
}

function showAlert(message, color) {
  alertt.style.display = "block";
  alertt.style.backgroundColor = color;
  alertt.innerText = message;
  setTimeout(() => {
    alertt.style.display = "none";
  }, 2000);
}

scoreBox.innerText = clientScore;

saveButton.addEventListener("click", saveHandler);
