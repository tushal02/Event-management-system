let eyeicon = document.getElementById('eyeicon');
let password = document.getElementById('password');
let signupbtn = document.getElementById('signupbtn');
let signinbtn = document.getElementById('signinbtn');
let nameField = document.getElementById('nameField');
let title = document.getElementById('title');
let forgotPass = document.getElementById('forgotPass');

let nameInput = document.querySelector("#nameField input");
let emailInput = document.querySelector(".input-field:nth-child(2) input");
let passwordInput = document.querySelector(".input-field:nth-child(3) input");

let isSignUpMode = true; // Default to Sign Up Mode

eyeicon.onclick = function () {
  if (password.type === 'password') {
    password.type = 'text';
    eyeicon.src = "eye-open.png";
  } else {
    password.type = 'password';
    eyeicon.src = "eye-close.png";
  }
};

// Switch to Sign In
signinbtn.onclick = function () {
  if (isSignUpMode) {
    // Switch to Sign In Mode (First Click)
    nameField.style.maxHeight = "0"; // Hide name field
    title.innerHTML = "Sign In";
    signupbtn.classList.add("disabled");
    signinbtn.classList.remove("disabled");
    forgotPass.style.display = "block";
    isSignUpMode = false; // Now in Sign In mode

    // Clear fields when switching modes
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
  } else {
    // Handle Sign In (Second Click)
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let enteredEmail = emailInput.value.trim();
    let enteredPassword = passwordInput.value.trim();

    let user = users.find(u => u.email === enteredEmail && u.password === enteredPassword);

    if (user) {
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.name);

      window.location.href = "dashboard.html"; // Redirect after login
    } else {
      alert("Invalid Email or Password!");
    }
  }
};

// Switch to Sign Up
signupbtn.onclick = function () {
  if (!isSignUpMode) {
    // Switch to Sign Up Mode (First Click)
    nameField.style.maxHeight = "60px"; // Show name field
    title.innerHTML = "Sign Up";
    signinbtn.classList.add("disabled");
    signupbtn.classList.remove("disabled");
    forgotPass.style.display = "none";
    isSignUpMode = true; // Now in Sign Up mode

    // Clear fields when switching modes
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
  } else {
    // Handle Sign Up (Second Click)
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();

    if (name && email && password) {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.some(user => user.email === email)) {
        alert("Email already registered! Please Sign In.");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Sign Up Successful! Now Sign In.");

      // Clear fields after signup
      nameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";

      // Automatically switch to Sign In mode after successful signup
      signinbtn.click();
    } else {
      alert("Please fill all fields!");
    }
  }
};
