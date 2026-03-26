document.getElementById("login-btn").addEventListener("click", function() {
    const username = document.getElementById("input-name");
    const password = document.getElementById("input-password");

    if (username.value === "admin" && password.value === "admin123") {
        //alert("Login successful!");
        // Redirect to the main page or dashboard
        window.location.href = "home.html"; // Change this to your actual dashboard page
    } else {
        alert("Invalid username or password. Please try again.");
    }
});


