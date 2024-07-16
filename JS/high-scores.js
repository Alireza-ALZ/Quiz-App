const allScores = JSON.parse(localStorage.getItem("allScores"));
const orderList = document.querySelector("ol");

allScores.forEach((array, index) => {
  orderList.innerHTML += `<li><span> ${index + 1} </span><p> ${
    array.username
  } </p><span> ${array.score} </span></li>`;
});
