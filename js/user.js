// Check Username Exsite ?
let userName = localStorage.getItem("username");
let btnSign = document.querySelector("#btn-sign");
let userInfo = document.querySelector("#user-info");
let msgWelcome = document.querySelector("#msgWelcome");
if (userName != null) {
  if(btnSign != null)
  btnSign.style.display = "none";
  userInfo.style.display = "flex";
  msgWelcome.innerHTML = `welcome ${userName}`;
  msgWelcome.style.display = "block";
} else {
  btnSign.style.display = "flex";
  userInfo.style.display = "none";
  msgWelcome.style.display = "none";
}



// Log out btn
let logoutBtn = document.querySelector("#logout-btn");
logoutBtn.addEventListener("click", function () {
  console.log("here");
  setTimeout(() => {
    localStorage.clear();
    window.location = "login.html";
  }, 1500);
});