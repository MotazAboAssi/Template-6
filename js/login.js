let email = localStorage.getItem("email");
let password = localStorage.getItem("password");
let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let loginBtn = document.querySelector("#btn-submit");

function finishLogin() {
  if (emailInput.value == "" || passwordInput.value == "") {
    alert("Please Fill the data !!");
  } else if (
    emailInput.value.trim() == email &&
    passwordInput.value.trim() == password
  ) {
    // localStorage.setItem("setOrder", "[]")
    // localStorage.setItem("setFavourite", "")
    setTimeout(() => {
      window.location = "index.html";
    }, 1500);
  } else {
    alert("Email or Password is wrong !!");
  }
}

loginBtn.addEventListener("click", finishLogin);


