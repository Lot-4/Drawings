// Simple login credentials
const users = {
  "divyanshu": "Dibang@2880",
  "girish": "Dibang@2880",
  "satwik": "Dibang@2880",
  "hansraj": "Dibang@2880",
  "asish": "Dibang@2880",
  "jitendra": "Dibang@2880",
  "manoj": "Dibang@2880"
};

function loginUser() {
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();
  const errorMsg = document.getElementById("loginError");

  if (users[username] && users[username] === password) {
    // Success
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("appContainer").style.display = "block";
  } else {
    // Error
    errorMsg.textContent = "Invalid ID or Password!";
    errorMsg.style.display = "block";
  }
}


