// loading of the website
document.addEventListener("DOMContentLoaded", function () {
  var loadingText = document.getElementById("loading-text");
  var percentage = 0;

  function updateLoadingText() {
    loadingText.textContent = "Loading: " + percentage + "%";
  }

  function increasePercentage() {
    if (percentage < 100) {
      percentage++;
      updateLoadingText();
      setTimeout(increasePercentage, 20); // Adjust the timing as needed
    } else {
      document.getElementById("loading-container").style.display = "none";
    }
  }

  // Start increasing the percentage
  increasePercentage();
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    // Hide the loading container
    document.getElementById("loading-container").style.opacity = 0;

    // Redirect to the main page after a delay
    setTimeout(function () {
      document.getElementById("loading-container").style.display = "none";
      window.location.href = "index.html";
    }, 500); // Adjust the time as needed
  }, 2000); // Adjust the time as needed
});
