// Simple login credentials
const users = {
  "admin": "1234",
  "dfs": "pass@2025"
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
