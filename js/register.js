let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let registerBtn = document.querySelector("#btn-submit");



function finishRegister() {
  console.log(firstName.value != "");
  if (
    firstName.value != "" &&
    lastName.value != "" &&
    email.value != "" &&
    password.value != ""
  ) {
    localStorage.setItem("username", `${firstName.value} ${lastName.value}`.trim());
    localStorage.setItem("email", email.value.trim());
    localStorage.setItem("password", password.value.trim());
    setTimeout(() => {
      window.location = "login.html";
    }, 1500);
  } else {
    alert("Fill the data Please");
  }
}

registerBtn.addEventListener("click", finishRegister);
