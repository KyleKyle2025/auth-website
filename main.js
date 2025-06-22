var registerName = document.getElementById("registerName");
var registerEmail = document.getElementById("registerEmail");
var registerPassword = document.getElementById("registerPassword");
var signUpBtn = document.getElementById("signUpBtn");

function registerUser() {
  var name = document.getElementById("registerName").value.trim();
  var email = document.getElementById("registerEmail").value.trim();
  var password = document.getElementById("registerPassword").value;

  if (name === "" || email === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];
  var emailExists = false;

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      emailExists = true;
      break;
    }
  }

  if (emailExists) {
    alert("Email already exists. Please use a different one.");
    return;
  }

  var newUser = {
    name: name,
    email: email,
    password: password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully!");
  window.location.href = "index.html";
}

function loginUser() {
  var email = document.getElementById("loginEmail").value.trim();
  var password = document.getElementById("loginPassword").value;

  if (email === "" || password === "") {
    alert("Please fill in both fields.");
    return;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];
  var isValidUser = false;
  var loggedInUser = null;

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      isValidUser = true;
      loggedInUser = users[i];
      break;
    }
  }

  if (isValidUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    window.location.href = "home.html";
  } else {
    alert("Incorrect email or password. Please try again.");
  }
}


if (window.location.pathname.includes("home.html")) {
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    window.location.href = "index.html"; // redirect to login
  } else {
    document.getElementById("welcomeMsg").innerText = "Welcome, " + loggedInUser.name + "!";
  }
}


function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}


