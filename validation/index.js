function checkUsernameAvailability() {
  var username = document.getElementById("username").value;
  var feedbackDiv = document.getElementById("username-feedback");

  setTimeout(function () {
    var isAvailable = Math.random() < 0.5; // Simulating availability

    if (isAvailable) {
      feedbackDiv.textContent = "Username is available";
      feedbackDiv.className = "valid";
    } else {
      feedbackDiv.textContent = "Username is not available";
      feedbackDiv.className = "invalid";
    }
  }, 500);
}

function checkPasswordStrength() {
  var password = document.getElementById("password").value;
  var strengthMeter = document.getElementById("password-feedback");

  // Password strength criteria (modify as needed)
  var length = password.length >= 8;
  var hasUppercase = /[A-Z]/.test(password);
  var hasLowercase = /[a-z]/.test(password);
  var hasNumber = /\d/.test(password);
  var hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  // Calculate overall strength
  var strength = 0;
  if (length) strength++;
  if (hasUppercase) strength++;
  if (hasLowercase) strength++;
  if (hasNumber) strength++;
  if (hasSpecialChar) strength++;

  // Display strength message
  var strengthMessage = "";
  switch (strength) {
    case 0:
    case 1:
      strengthMessage = "Weak";
      break;
    case 2:
      strengthMessage = "Moderate";
      break;
    case 3:
    case 4:
      strengthMessage = "Strong";
      break;
    case 5:
      strengthMessage = "Very Strong";
      break;
    default:
      strengthMessage = "";
  }

  strengthMeter.textContent = "Password Strength: " + strengthMessage;
}

function validateDateOfBirth() {
  var dobInput = document.getElementById("dob").value;
  var feedbackDiv = document.getElementById("dob-feedback");

  // Regular expression to validate date format (YYYY-MM-DD)
  var dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the input matches the expected date format
  if (!dateFormatRegex.test(dobInput)) {
    feedbackDiv.textContent = "Invalid date format. Please use YYYY-MM-DD.";
    feedbackDiv.className = "error";
  } else {
    var dobDate = new Date(dobInput);

    // Calculate age
    var today = new Date();
    var age = today.getFullYear() - dobDate.getFullYear();
    var monthDiff = today.getMonth() - dobDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    // Check if the user is at least 18 years old
    if (age < 18) {
      feedbackDiv.textContent = "You must be at least 18 years old.";
      feedbackDiv.className = "error";
    } else {
      // Display validation feedback
      feedbackDiv.textContent =
        "Date of birth is valid. Age: " + age + " years.";
      feedbackDiv.className = "valid";
    }
  }
}

function validateForm(event) {
  event.preventDefault(); // Prevent form submission for now

  validateDateOfBirth();
  checkUsernameAvailability();
  checkPasswordStrength();
  validatePhoneNumber();
  validateEmail();
  validateConfirmEmail();
  // Check if the terms and conditions checkbox is checked
  var termsCheckbox = document.getElementById("terms");
  var termsFeedbackDiv = document.getElementById("terms-feedback");

  if (!termsCheckbox.checked) {
    termsFeedbackDiv.textContent = "You must accept the terms and conditions.";
    termsFeedbackDiv.className = "error";
  } else {
    termsFeedbackDiv.textContent = "";
  }

  // Validate the reCAPTCHA response
  let captchaResponse = grecaptcha.getResponse();
  let captchaFeedbackDiv = document.getElementById("captcha-feedback");

  if (!captchaResponse) {
    captchaFeedbackDiv.textContent = "Please complete the CAPTCHA.";
    captchaFeedbackDiv.className = "error";
  } else {
    captchaFeedbackDiv.textContent = "";
  }

  // If there are any errors, do not submit the form
  let invalidElements = document.querySelectorAll(".error");
  if (invalidElements.length === 0) {
    // Perform any additional form submission logic here
    alert("Form submitted successfully!");
    // Reset the form or navigate to another page if needed
    document.getElementById("myForm").reset();
  }
}

function validatePhoneNumber() {
  var phoneInput = document.getElementById("phone").value;
  var feedbackDiv = document.getElementById("phone-feedback");

  // Regular expression to validate phone number format
  var phoneFormatRegex = /^[+]\d{1,3}\s?\d{1,}-?\d{1,}-?\d{1,}$/;

  // Check if the input matches the expected phone number format
  if (!phoneFormatRegex.test(phoneInput)) {
    feedbackDiv.textContent = "Invalid phone number format.";
    feedbackDiv.className = "error";
  } else {
    feedbackDiv.textContent = "Phone number format is valid.";
    feedbackDiv.className = "valid";
  }
}

function validateEmail() {
  var emailInput = document.getElementById("email");
  var feedbackDiv = document.getElementById("email-feedback");

  // Simple email format validation using HTML5 built-in validation
  if (!emailInput.checkValidity()) {
    feedbackDiv.textContent = "Invalid email format.";
    feedbackDiv.className = "error";
    emailInput.classList.add("invalid");
  } else {
    feedbackDiv.textContent = "";
    emailInput.classList.remove("invalid");
  }
}

function validateConfirmEmail() {
  var confirmEmailInput = document.getElementById("confirm-email");
  var emailInput = document.getElementById("email");
  var feedbackDiv = document.getElementById("confirm-email-feedback");

  // Check if the email confirmation matches the original email
  if (confirmEmailInput.value !== emailInput.value) {
    feedbackDiv.textContent = "Email confirmation does not match.";
    feedbackDiv.className = "error";
    confirmEmailInput.classList.add("invalid");
  } else {
    feedbackDiv.textContent = "";
    confirmEmailInput.classList.remove("invalid");
  }
}

function submit() {
  document.getElementById("myForm").reset();
}
